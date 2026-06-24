import Hero from "../src/Components/Hero";
import ProjectCollapse from "../src/Components/ProjectCollapse";
import Contact from "../src/Components/Contact";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <section id="Home" className={styles.homeSection}>
        <div className={styles.homeMain}>
          <Hero />
          <Contact />
        </div>
      </section>
      <section id="Projects" className={styles.projectsSection}>
        <div className={styles.projectSection}>
          <ProjectCollapse />
        </div>
      </section>
    </div>
  );
};

export default Home;