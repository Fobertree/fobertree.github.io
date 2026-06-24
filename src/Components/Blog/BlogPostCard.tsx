import Link from "next/link";
import { BlogPostSummary } from "../../lib/blog";
import BlogPostMeta from "./BlogPostMeta";
import styles from "./Blog.module.css";

export default function BlogPostCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.postCard}>
      <div className={styles.postCardHeader}>
        <h2 className={styles.postCardTitle}>{post.title}</h2>
      </div>
      <div className={styles.postCardBody}>
        <BlogPostMeta {...post} />
        {post.excerpt ? (
          <p className={styles.postCardExcerpt}>{post.excerpt}</p>
        ) : null}
      </div>
    </Link>
  );
}