"use client";

import { PROJECTS, WORK_EXPERIENCE } from "../data/projects";
import ProjectCollapseCard from "./ProjectCollapseCard";
import styles from "./ProjectCollapse.module.css";

const ProjectSection = ({ title, items }) => (
  <div className={styles.section}>
    <h2 className={styles.sectionHeading}>{title}</h2>
    {items.map((item) => (
      <ProjectCollapseCard key={item.label_id} {...item} />
    ))}
  </div>
);

export default function ProjectCollapse() {
  return (
    <>
      <ProjectSection title="Work Experience" items={WORK_EXPERIENCE} />
      <ProjectSection title="Projects" items={PROJECTS} />
    </>
  );
}