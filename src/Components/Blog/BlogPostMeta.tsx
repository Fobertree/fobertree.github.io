import { BlogPostSummary, formatBlogDate } from "../../lib/blog";
import styles from "./Blog.module.css";

type BlogPostMetaProps = Pick<
  BlogPostSummary,
  "dateCreated" | "dateUpdated" | "tags"
> & {
  variant?: "card" | "article";
  showCreatedLabel?: boolean;
};

export default function BlogPostMeta({
  dateCreated,
  dateUpdated,
  tags,
  variant = "card",
  showCreatedLabel = false,
}: BlogPostMetaProps) {
  const created = formatBlogDate(dateCreated);
  const updated =
    dateUpdated !== dateCreated ? formatBlogDate(dateUpdated) : null;
  const datesClass =
    variant === "article" ? styles.articleDates : styles.postCardDates;
  const visibleTags = tags.filter((tag) => tag.toLowerCase() !== "hidden");

  return (
    <div
      className={
        variant === "article" ? styles.articleMeta : styles.postCardMeta
      }
    >
      <div className={datesClass}>
        <time dateTime={dateCreated}>
          {showCreatedLabel ? `Created ${created}` : created}
        </time>
        {updated ? (
          <time dateTime={dateUpdated}>
            {showCreatedLabel ? `Updated ${updated}` : `Updated ${updated}`}
          </time>
        ) : null}
      </div>
      {visibleTags.length > 0 ? (
        <div className={styles.tagList}>
          {visibleTags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}