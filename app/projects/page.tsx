import ProjectCollapse from "../../src/Components/ProjectCollapse";
import ContentPanel from "../../src/Components/ContentPanel";

export const metadata = {
  title: "Projects | Alexander Liu",
  description: "Work experience and projects.",
};

export default function ProjectsPage() {
  return (
    <main>
      <ContentPanel offset="blog">
        <ProjectCollapse />
      </ContentPanel>
    </main>
  );
}