import { LatexSection } from "../../lib/blog";
import MarkdownContent from "./MarkdownContent";
import styles from "./Blog.module.css";

interface LatexDocumentProps {
  html?: string;
  sections?: LatexSection[];
  title?: string;
  embedded?: boolean;
}

export default function LatexDocument({
  html,
  sections,
  title,
  embedded = false,
}: LatexDocumentProps) {
  const sectionClass = embedded
    ? `${styles.latexDocument} ${styles.latexDocumentEmbedded}`
    : styles.latexDocument;

  const hasSections = sections && sections.length > 0;
  const hasInline = Boolean(html);

  if (!hasSections && !hasInline) {
    return null;
  }

  return (
    <section className={sectionClass}>
      {title ? <h2 className={styles.latexTitle}>{title}</h2> : null}
      <div className={styles.latexBody}>
        {hasInline ? <MarkdownContent html={html!} /> : null}
        {hasSections
          ? sections!.map((section) => (
              <div key={section.source} className={styles.latexSection}>
                {section.title ? (
                  <h3 className={styles.latexSectionTitle}>{section.title}</h3>
                ) : null}
                <MarkdownContent html={section.html} />
              </div>
            ))
          : null}
      </div>
    </section>
  );
}