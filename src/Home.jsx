import Hero from "./Components/Hero";
import ProjectCollapse from "./Components/ProjectCollapse";
import Contact from "./Components/Contact";
import ContentPanel from "./Components/ContentPanel";

const Home = () => (
  <>
    <section id="Home">
      <ContentPanel offset="home">
        <Hero />
        <Contact />
      </ContentPanel>
    </section>
    <section id="Projects">
      <ContentPanel>
        <ProjectCollapse />
      </ContentPanel>
    </section>
  </>
);

export default Home;