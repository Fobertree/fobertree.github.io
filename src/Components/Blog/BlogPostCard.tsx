import Link from "next/link";
import { BlogPostSummary, formatBlogDate } from "../../lib/blog";
import styles from "./Blog.module.css";

interface BlogPostCardProps {
  post: BlogPostSummary;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const created = formatBlogDate(post.dateCreated);
  const updated =
    post.dateUpdated !== post.dateCreated
      ? formatBlogDate(post.dateUpdated)
      : null;

  return (
    <Link href={`/blog/${post.slug}`} className={styles.postCard}>
      <div className={styles.postCardHeader}>
        <h2 className={styles.postCardTitle}>{post.title}</h2>
      </div>
      <div className={styles.postCardBody}>
        <div className={styles.postCardMeta}>
          <div className={styles.postCardDates}>
            <time dateTime={post.dateCreated}>{created}</time>
            {updated ? <span>Updated {updated}</span> : null}
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
        {post.excerpt ? (
          <p className={styles.postCardExcerpt}>{post.excerpt}</p>
        ) : null}
      </div>
    </Link>
  );
}