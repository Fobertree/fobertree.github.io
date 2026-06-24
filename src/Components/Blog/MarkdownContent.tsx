import styles from "./Blog.module.css";

interface MarkdownContentProps {
  html: string;
  className?: string;
}

export default function MarkdownContent({
  html,
  className,
}: MarkdownContentProps) {
  const classes = [styles.markdown, className].filter(Boolean).join(" ");

  return <div className={classes} dangerouslySetInnerHTML={{ __html: html }} />;
}