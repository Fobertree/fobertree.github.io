import fs from "fs";
import path from "path";
import { parseFrontmatter } from "./frontmatter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

const BLOGS_DIR = path.join(process.cwd(), "blogs");
const LATEX_EXT = new Set([".md", ".tex", ".latex"]);
const LATEX_DOC_REGEX =
  /```latex-doc(?:\s+dir="([^"]*)")?(?:\s+title="([^"]*)")?\s*\n([\s\S]*?)```/g;
const INPUT_REGEX = /\\input\{([^}]+)\}/g;
const DEFAULT_LATEX_DIR = "latex-doc";

export interface BlogMetadata {
  title: string;
  dateCreated: string;
  dateUpdated: string;
  tags: string[];
  /** True when frontmatter has `hidden: true` or a `hidden` tag. */
  hidden: boolean;
  excerpt?: string;
}

export interface BlogPostSummary extends BlogMetadata {
  slug: string;
}

export interface LatexSection {
  title?: string;
  html: string;
  source: string;
}

export interface ContentBlock {
  type: "markdown" | "latex";
  title?: string;
  html?: string;
  sections?: LatexSection[];
}

export interface BlogPost extends BlogPostSummary {
  contentBlocks: ContentBlock[];
  notesHtml?: string;
  notesTitle?: string;
}

const md = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeKatex)
  .use(rehypeStringify, { allowDangerousHtml: true });

async function markdownToHtml(markdown: string) {
  return String(await md.process(markdown));
}

async function pushMarkdown(blocks: ContentBlock[], markdown: string) {
  const trimmed = markdown.trim();
  if (trimmed) blocks.push({ type: "markdown", html: await markdownToHtml(trimmed) });
}

/** Normalize tags from list, scalar, comma-separated, or flow-style `[a, b]`. */
function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((tag) => tag.trim()).filter(Boolean);
  }
  if (value == null || value === "") return [];

  let raw = String(value).trim();
  if (raw.startsWith("[") && raw.endsWith("]")) {
    raw = raw.slice(1, -1);
  }

  return raw
    .split(/[,]+/)
    .map((tag) => tag.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function isTruthyFlag(value: unknown) {
  if (value === true || value === 1) return true;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    return v === "true" || v === "yes" || v === "1";
  }
  return false;
}

function parseMetadata(data: Record<string, unknown>): BlogMetadata {
  const dateCreated = String(data.dateCreated ?? data.date ?? "");
  const tags = normalizeTags(data.tags);
  return {
    title: String(data.title ?? "Untitled"),
    dateCreated,
    dateUpdated: String(data.dateUpdated ?? dateCreated),
    tags,
    hidden: isTruthyFlag(data.hidden) || tags.some((tag) => tag.toLowerCase() === "hidden"),
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
  };
}

function readPostFile(slug: string) {
  const postPath = path.join(BLOGS_DIR, slug, "post.md");
  if (!fs.existsSync(postPath)) return null;
  const { data, content } = parseFrontmatter(fs.readFileSync(postPath, "utf8"));
  return { metadata: parseMetadata(data), content };
}

function getPostDir(postSlug: string) {
  return path.join(BLOGS_DIR, postSlug);
}

function isInsidePostDir(postDir: string, resolvedPath: string) {
  const root = postDir.endsWith(path.sep) ? postDir : postDir + path.sep;
  return resolvedPath === postDir || resolvedPath.startsWith(root);
}

function collectLatexFiles(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectLatexFiles(fullPath);
      return LATEX_EXT.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
    });
}

function parseInputPaths(body: string): string[] {
  const paths: string[] = [];
  const regex = new RegExp(INPUT_REGEX.source, "g");
  let match: RegExpExecArray | null;
  while ((match = regex.exec(body)) !== null) {
    const inputPath = match[1].trim().replace(/^["']|["']$/g, "");
    if (inputPath) paths.push(inputPath);
  }
  return paths;
}

/** Resolve an \input path: bare names use includeRoot; paths with separators are post-relative. */
function resolveLatexInputPath(postDir: string, includeRoot: string, inputPath: string) {
  const normalized = inputPath.replace(/\\/g, "/");
  const relative = normalized.includes("/")
    ? normalized
    : path.posix.join(includeRoot.replace(/\\/g, "/"), normalized);
  const resolved = path.resolve(postDir, relative);

  if (!isInsidePostDir(postDir, resolved)) {
    throw new Error(`latex-doc \\input escapes post directory: ${inputPath}`);
  }
  if (!LATEX_EXT.has(path.extname(resolved).toLowerCase())) {
    throw new Error(
      `latex-doc \\input must be .md, .tex, or .latex: ${inputPath}`
    );
  }
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    throw new Error(`latex-doc \\input not found: ${inputPath} (resolved ${path.relative(postDir, resolved)})`);
  }
  return resolved;
}

async function loadLatexFile(postDir: string, filePath: string): Promise<LatexSection> {
  const raw = fs.readFileSync(filePath, "utf8");
  const isMd = path.extname(filePath).toLowerCase() === ".md";
  const parsed = isMd
    ? parseFrontmatter(raw)
    : { data: {} as Record<string, unknown>, content: raw };
  const base = path.basename(filePath, path.extname(filePath));
  return {
    title: parsed.data.title ? String(parsed.data.title) : base,
    html: await markdownToHtml(parsed.content.trim()),
    source: path.relative(postDir, filePath),
  };
}

async function loadLatexDirectory(postSlug: string, relativeDir: string) {
  const postDir = getPostDir(postSlug);
  const dirPath = path.resolve(postDir, relativeDir);
  if (!isInsidePostDir(postDir, dirPath) || !fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return [];
  }

  return Promise.all(collectLatexFiles(dirPath).map((filePath) => loadLatexFile(postDir, filePath)));
}

async function loadLatexInputs(postSlug: string, includeRoot: string, inputPaths: string[]) {
  const postDir = getPostDir(postSlug);
  return Promise.all(
    inputPaths.map((inputPath) =>
      loadLatexFile(postDir, resolveLatexInputPath(postDir, includeRoot, inputPath))
    )
  );
}

/**
 * latex-doc fence behavior:
 * 1. Body contains \input{...} → load those files in order (bare names under dir, default latex-doc/)
 * 2. Body non-empty without \input → treat as inline Markdown/KaTeX
 * 3. Empty body → load entire dir (default latex-doc/)
 */
async function parseLatexDocFence(postSlug: string, dir?: string, title?: string, body = "") {
  const includeRoot = dir || DEFAULT_LATEX_DIR;
  const inline = body.trim();
  const inputs = parseInputPaths(body);

  if (inputs.length > 0) {
    return {
      type: "latex" as const,
      title,
      sections: await loadLatexInputs(postSlug, includeRoot, inputs),
    };
  }

  if (inline) return { type: "latex" as const, title, html: await markdownToHtml(inline) };

  return {
    type: "latex" as const,
    title,
    sections: await loadLatexDirectory(postSlug, includeRoot),
  };
}

async function parseMarkdownWithEmbeds(postSlug: string, markdown: string) {
  const blocks: ContentBlock[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(LATEX_DOC_REGEX.source, "g");

  while ((match = regex.exec(markdown)) !== null) {
    await pushMarkdown(blocks, markdown.slice(lastIndex, match.index));
    blocks.push(await parseLatexDocFence(postSlug, match[1], match[2], match[3]));
    lastIndex = match.index + match[0].length;
  }

  await pushMarkdown(blocks, markdown.slice(lastIndex));
  if (!blocks.length) await pushMarkdown(blocks, markdown);
  return blocks;
}

/** Hidden posts are omitted from the index and return 404 by slug. */
export function isPostHidden(post: Pick<BlogMetadata, "hidden" | "tags">) {
  return Boolean(post.hidden) || post.tags.some((tag) => tag.toLowerCase() === "hidden");
}

function listPostDirectories() {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs
    .readdirSync(BLOGS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getAllPostsMetadata(): BlogPostSummary[] {
  return listPostDirectories()
    .map((slug) => {
      const post = readPostFile(slug);
      return post ? { slug, ...post.metadata } : null;
    })
    .filter((post): post is BlogPostSummary => post !== null && !isPostHidden(post))
    .sort((a, b) => +new Date(b.dateCreated) - +new Date(a.dateCreated));
}

export function getAllPostSlugs() {
  return getAllPostsMetadata().map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = readPostFile(slug);
  if (!post || isPostHidden(post.metadata)) return null;

  const notesPath = path.join(BLOGS_DIR, slug, "notes.md");
  const notes = fs.existsSync(notesPath)
    ? parseFrontmatter(fs.readFileSync(notesPath, "utf8"))
    : null;

  return {
    slug,
    ...post.metadata,
    contentBlocks: await parseMarkdownWithEmbeds(slug, post.content),
    notesHtml: notes ? await markdownToHtml(notes.content) : undefined,
    notesTitle: notes?.data.title ? String(notes.data.title) : undefined,
  };
}

export function formatBlogDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}