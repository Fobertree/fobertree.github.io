import fs from "fs";
import path from "path";
import matter from "gray-matter";
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

export interface BlogMetadata {
  title: string;
  dateCreated: string;
  dateUpdated: string;
  tags: string[];
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

function parseMetadata(data: Record<string, unknown>): BlogMetadata {
  const dateCreated = String(data.dateCreated ?? data.date ?? "");
  return {
    title: String(data.title ?? "Untitled"),
    dateCreated,
    dateUpdated: String(data.dateUpdated ?? dateCreated),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
  };
}

function readPostFile(slug: string) {
  const postPath = path.join(BLOGS_DIR, slug, "post.md");
  if (!fs.existsSync(postPath)) return null;
  const { data, content } = matter(fs.readFileSync(postPath, "utf8"));
  return { metadata: parseMetadata(data), content };
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

async function loadLatexDirectory(postSlug: string, relativeDir: string) {
  const postDir = path.join(BLOGS_DIR, postSlug);
  const dirPath = path.resolve(postDir, relativeDir);
  if (!dirPath.startsWith(postDir + path.sep) || !fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return [];
  }

  return Promise.all(
    collectLatexFiles(dirPath).map(async (filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const isMd = path.extname(filePath).toLowerCase() === ".md";
      const parsed = isMd ? matter(raw) : { data: {} as Record<string, unknown>, content: raw };
      const base = path.basename(filePath, path.extname(filePath));
      return {
        title: parsed.data.title ? String(parsed.data.title) : base,
        html: await markdownToHtml(parsed.content.trim()),
        source: path.relative(postDir, filePath),
      };
    })
  );
}

async function parseLatexDocFence(postSlug: string, dir?: string, title?: string, body = "") {
  const inline = body.trim();
  if (inline) return { type: "latex" as const, title, html: await markdownToHtml(inline) };
  return {
    type: "latex" as const,
    title,
    sections: await loadLatexDirectory(postSlug, dir || "latex-doc"),
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

export function getAllPostSlugs() {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs
    .readdirSync(BLOGS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getAllPostsMetadata(): BlogPostSummary[] {
  return getAllPostSlugs()
    .map((slug) => {
      const post = readPostFile(slug);
      return post ? { slug, ...post.metadata } : null;
    })
    .filter((post): post is BlogPostSummary => post !== null)
    .sort((a, b) => +new Date(b.dateCreated) - +new Date(a.dateCreated));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = readPostFile(slug);
  if (!post) return null;

  const notesPath = path.join(BLOGS_DIR, slug, "notes.md");
  const notes = fs.existsSync(notesPath) ? matter(fs.readFileSync(notesPath, "utf8")) : null;

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