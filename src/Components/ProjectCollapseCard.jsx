import React from "react";
import styles from "../collapsible.module.css";

function ProjectCollapseCard({
  title,
  description,
  tech_stack,
  label_id,
  url = null,
  url_text = "Learn More",
}) {
    console.warn("rendered card");
  return (
    <section className={styles.accordion}>
      <input type="checkbox" name="collapse" id={label_id} />

      <h2 className={styles.handle}>
        <label htmlFor={label_id}>{title}</label>
      </h2>

      <div className={styles.content}>
        <p>
          <strong>Description:</strong> {description}
        </p>

        <p>
          <strong>Technologies Used:</strong> {tech_stack}
        </p>

        {url && (
          <p className={styles.accordionURL}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url_text}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export default ProjectCollapseCard;