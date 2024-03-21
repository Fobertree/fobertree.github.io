import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Contact = () => {
  return (
    <div className="ContactSection">
      <a href="https://github.com/Fobertree" target="_blank" rel="noreferrer">
        <GitHubIcon
          className="ProjectSectionSvgIcons"
          style={{ color: "rgba(174, 189, 255, 0.89)" }}
        />
      </a>
      <a
        href="https://www.linkedin.com/in/aliu266/"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedInIcon
          className="ProjectSectionSvgIcons"
          style={{ color: "rgba(174, 189, 255, 0.89)" }}
        />
      </a>
      <a href="mailto:aliu266@emory.edu" target="_blank" rel="noreferrer">
        <EmailIcon
          className="ProjectSectionSvgIcons"
          style={{ color: "rgba(174, 189, 255, 0.89)" }}
        />
      </a>
    </div>
  );
};

export default Contact;
