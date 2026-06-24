import styles from "../collapsible.module.css";

export default function ProjectCollapseCard({
  title,
  description,
  bullets,
  tech_stack,
  label_id,
  url,
  url_text = "Learn More",
}) {
  return (
    <section className={styles.accordion}>
      <input type="checkbox" name="collapse" id={label_id} />
      <h2 className={styles.handle}>
        <label htmlFor={label_id}>{title}</label>
      </h2>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div>
            <strong>Description:</strong>{" "}
            {bullets ? (
              <ul>
                {bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              description
            )}
          </div>
          <p>
            <strong>Technologies Used:</strong> {tech_stack}
          </p>
          {url ? (
            <p>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url_text}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}