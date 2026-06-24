import { LatexSection } from "../../lib/blog";
import { cx } from "../../lib/cx";
import MarkdownContent from "./MarkdownContent";
import styles from "./Blog.module.css";

export default function LatexDocument({
  html,
  sections,
  title,
  embedded = false,
}: {
  html?: string;
  sections?: LatexSection[];
  title?: string;
  embedded?: boolean;
}) {
  if (!html && !sections?.length) return null;

  return (
    <section
      className={cx(styles.latexDocument, embedded && styles.latexDocumentEmbedded)}
    >
      {title ? <h2 className={styles.latexTitle}>{title}</h2> : null}
      <div className={styles.latexBody}>
        {html ? <MarkdownContent html={html} /> : null}
        {sections?.map((section) => (
          <div key={section.source} className={styles.latexSection}>
            {section.title ? (
              <h3 className={styles.latexSectionTitle}>{section.title}</h3>
            ) : null}
            <MarkdownContent html={section.html} />
          </div>
        ))}
      </div>
    </section>
  );
}