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

export const LATEX_DOC_FENCE = "latex-doc";
export const LATEX_DOC_DEFAULT_DIR = "latex-doc";
export const LATEX_DOC_EXTENSIONS = [".md", ".tex", ".latex"] as const;

const LATEX_DOC_REGEX = new RegExp(
  `\`\`\`${LATEX_DOC_FENCE}(?:\\s+dir="([^"]*)")?(?:\\s+title="([^"]*)")?\\s*\\n([\\s\\S]*?)\`\`\``,
  "g"
);

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

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}

function resolvePostSubdirectory(
  postSlug: string,
  relativeDir: string
): string | null {
  const postDir = path.join(BLOGS_DIR, postSlug);
  const resolved = path.resolve(postDir, relativeDir);

  if (!resolved.startsWith(postDir + path.sep) && resolved !== postDir) {
    return null;
  }

  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
    return null;
  }

  return resolved;
}

function collectLatexFiles(dir: string): string[] {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));

  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectLatexFiles(fullPath));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (
      LATEX_DOC_EXTENSIONS.includes(
        extension as (typeof LATEX_DOC_EXTENSIONS)[number]
      )
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function titleFromFilename(filePath: string): string {
  const base = path.basename(filePath);
  const extension = path.extname(base);
  return base.slice(0, base.length - extension.length);
}

async function loadLatexDirectory(
  postSlug: string,
  relativeDir: string
): Promise<LatexSection[]> {
  const dirPath = resolvePostSubdirectory(postSlug, relativeDir);
  if (!dirPath) {
    return [];
  }

  const files = collectLatexFiles(dirPath);
  const postDir = path.join(BLOGS_DIR, postSlug);
  const sections: LatexSection[] = [];

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const extension = path.extname(filePath).toLowerCase();
    let content = raw;
    let title = titleFromFilename(filePath);

    if (extension === ".md") {
      const { data, content: markdownContent } = matter(raw);
      content = markdownContent;
      if (data.title) {
        title = String(data.title);
      }
    }

    sections.push({
      title,
      html: await markdownToHtml(content.trim()),
      source: path.relative(postDir, filePath),
    });
  }

  return sections;
}

async function parseLatexDocFence(
  postSlug: string,
  dirAttr: string | undefined,
  titleAttr: string | undefined,
  body: string
): Promise<ContentBlock> {
  const inlineBody = body.trim();

  if (inlineBody) {
    return {
      type: "latex",
      title: titleAttr || undefined,
      html: await markdownToHtml(inlineBody),
    };
  }

  const relativeDir = dirAttr || LATEX_DOC_DEFAULT_DIR;
  const sections = await loadLatexDirectory(postSlug, relativeDir);

  return {
    type: "latex",
    title: titleAttr || undefined,
    sections,
  };
}

async function parseMarkdownWithEmbeds(
  postSlug: string,
  markdown: string
): Promise<ContentBlock[]> {
  const blocks: ContentBlock[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const regex = new RegExp(LATEX_DOC_REGEX.source, "g");

  while ((match = regex.exec(markdown)) !== null) {
    if (match.index > lastIndex) {
      const segment = markdown.slice(lastIndex, match.index).trim();
      if (segment) {
        blocks.push({ type: "markdown", html: await markdownToHtml(segment) });
      }
    }

    blocks.push(
      await parseLatexDocFence(postSlug, match[1], match[2], match[3])
    );

    lastIndex = match.index + match[0].length;
  }

  const remainder = markdown.slice(lastIndex).trim();
  if (remainder) {
    blocks.push({ type: "markdown", html: await markdownToHtml(remainder) });
  }

  if (blocks.length === 0) {
    blocks.push({ type: "markdown", html: await markdownToHtml(markdown) });
  }

  return blocks;
}

function parseMetadata(data: Record<string, unknown>): BlogMetadata {
  const dateCreated = String(data.dateCreated ?? data.date ?? "");
  const dateUpdated = String(data.dateUpdated ?? dateCreated);

  return {
    title: String(data.title ?? "Untitled"),
    dateCreated,
    dateUpdated,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
  };
}

function readPostFile(slug: string) {
  const postPath = path.join(BLOGS_DIR, slug, "post.md");
  if (!fs.existsSync(postPath)) {
    return null;
  }

  const raw = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(raw);

  return {
    metadata: parseMetadata(data),
    content,
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOGS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOGS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getAllPostsMetadata(): BlogPostSummary[] {
  return getAllPostSlugs()
    .map((slug) => {
      const post = readPostFile(slug);
      if (!post) {
        return null;
      }

      return {
        slug,
        ...post.metadata,
      };
    })
    .filter((post): post is BlogPostSummary => post !== null)
    .sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = readPostFile(slug);
  if (!post) {
    return null;
  }

  const contentBlocks = await parseMarkdownWithEmbeds(slug, post.content);

  const notesPath = path.join(BLOGS_DIR, slug, "notes.md");
  let notesHtml: string | undefined;
  let notesTitle: string | undefined;

  if (fs.existsSync(notesPath)) {
    const notesRaw = fs.readFileSync(notesPath, "utf8");
    const { data: notesData, content: notesContent } = matter(notesRaw);
    notesHtml = await markdownToHtml(notesContent);
    notesTitle = notesData.title ? String(notesData.title) : undefined;
  }

  return {
    slug,
    ...post.metadata,
    contentBlocks,
    notesHtml,
    notesTitle,
  };
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}