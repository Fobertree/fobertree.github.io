import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div id="Contact" className={styles.contactSection}>
      <a href="https://github.com/Fobertree" target="_blank" rel="noreferrer">
        <GitHubIcon className={styles.contactIcon} />
      </a>
      <a
        href="https://www.linkedin.com/in/aliu266/"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedInIcon className={styles.contactIcon} />
      </a>
      <a href="mailto:aliu266@emory.edu" target="_blank" rel="noreferrer">
        <EmailIcon className={styles.contactIcon} />
      </a>
    </div>
  );
};

export default Contact;