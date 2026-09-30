import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPostContent from "../../../src/Components/Blog/BlogPostContent";
import BlogPostMeta from "../../../src/Components/Blog/BlogPostMeta";
import ContentPanel from "../../../src/Components/ContentPanel";
import LatexDocument from "../../../src/Components/Blog/LatexDocument";
import { getAllPostSlugs, getPostBySlug } from "../../../src/lib/blog";
import styles from "../../../src/Components/Blog/Blog.module.css";
import NotFound from "../../not-found";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

// Static export rejects a dynamic route that prerenders zero paths, and
// reports that as a missing generateStaticParams(). Hidden posts are
// omitted from the public list, so keep one inert path when none are public.
const STATIC_EXPORT_FALLBACK_SLUG = "__empty";

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  const paths = slugs.length > 0 ? slugs : [STATIC_EXPORT_FALLBACK_SLUG];
  return paths.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Alexander Liu" };
  return {
    title: `${post.title} | Alexander Liu`,
    description: post.excerpt ?? post.title,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  // notFound() during export writes an empty error document for this
  // required placeholder, so render the 404 page directly.
  if (!post) {
    if (slug === STATIC_EXPORT_FALLBACK_SLUG) return <NotFound />;
    notFound();
  }

  return (
    <main className={styles.blogPage}>
      <ContentPanel offset="blog">
        <article className={styles.article}>
          <nav className={styles.backNav} aria-label="Blog navigation">
            <Link href="/blog" className={styles.backLink}>
              ← Back to blog
            </Link>
          </nav>
          <div className={styles.articleCard}>
            <header className={styles.articleHeader}>
              <h1 className={styles.articleTitle}>{post.title}</h1>
            </header>
            <div className={styles.articleBody}>
              <BlogPostMeta {...post} variant="article" showCreatedLabel />
              <BlogPostContent blocks={post.contentBlocks} />
              {post.notesHtml ? (
                <LatexDocument html={post.notesHtml} title={post.notesTitle} />
              ) : null}
            </div>
          </div>
        </article>
      </ContentPanel>
    </main>
  );
}