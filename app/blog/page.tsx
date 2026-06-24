import BlogPostCard from "../../src/Components/Blog/BlogPostCard";
import ContentPanel from "../../src/Components/ContentPanel";
import { getAllPostsMetadata } from "../../src/lib/blog";
import styles from "../../src/Components/Blog/Blog.module.css";

export const metadata = {
  title: "Blog | Alexander Liu",
  description: "Notes on code, art, and side projects.",
};

export default function BlogPage() {
  const posts = getAllPostsMetadata();

  return (
    <main className={styles.blogPage}>
      <ContentPanel>
        <header className={styles.header}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Thoughts on C++, drawing, and whatever I am learning that week.
          </p>
        </header>
        <section className={styles.postList}>
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </section>
      </ContentPanel>
    </main>
  );
}