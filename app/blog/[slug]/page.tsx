import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPostContent from "../../../src/Components/Blog/BlogPostContent";
import LatexDocument from "../../../src/Components/Blog/LatexDocument";
import {
  formatBlogDate,
  getAllPostSlugs,
  getPostBySlug,
} from "../../../src/lib/blog";
import styles from "../../../src/Components/Blog/Blog.module.css";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Alexander Liu" };
  }

  return {
    title: `${post.title} | Alexander Liu`,
    description: post.excerpt ?? post.title,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const created = formatBlogDate(post.dateCreated);
  const updated =
    post.dateUpdated !== post.dateCreated
      ? formatBlogDate(post.dateUpdated)
      : null;

  return (
    <main>
      <div className={styles.blogPage}>
        <div className={`${styles.blogMain} ${styles.blogMainOffset}`}>
          <article className={`${styles.article} ${styles.contentPanel}`}>
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
                <div className={styles.articleMeta}>
                  <div className={styles.articleDates}>
                    <time dateTime={post.dateCreated}>Created {created}</time>
                    {updated ? (
                      <time dateTime={post.dateUpdated}>Updated {updated}</time>
                    ) : null}
                  </div>
                  {post.tags.length > 0 ? (
                    <div className={styles.tagList}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <BlogPostContent blocks={post.contentBlocks} />
                {post.notesHtml ? (
                  <LatexDocument
                    html={post.notesHtml}
                    title={post.notesTitle}
                  />
                ) : null}
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}