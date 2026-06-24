import { cx } from "../lib/cx";
import styles from "../styles/layout.module.css";

type ContentPanelProps = {
  children: React.ReactNode;
  className?: string;
  offset?: "home" | "blog";
};

export default function ContentPanel({
  children,
  className,
  offset,
}: ContentPanelProps) {
  return (
    <div
      className={cx(
        styles.contentPanel,
        offset === "home" && styles.offsetHome,
        offset === "blog" && styles.offsetBlog,
        className
      )}
    >
      {children}
    </div>
  );
}