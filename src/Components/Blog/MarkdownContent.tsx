import { cx } from "../../lib/cx";
import styles from "./Blog.module.css";

export default function MarkdownContent({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cx(styles.markdown, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}