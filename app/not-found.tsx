import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Page not found</p>
      <Link href="/">Back home</Link>
    </main>
  );
}