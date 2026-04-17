import Hero from "../src/Components/Hero";
import ProjectCollapse from "../src/Components/ProjectCollapse";
//import ProjectCard from "../Components/ProjectCard";
import Contact from "../src/Components/Contact";
import "../src/App.module.css";
//import About from "../Components/About";
//import flow from "../Components/images/flowfield1.png";

const Home = () => {
  return (
    <div className="Home" >
        <section id="Home">
          <Hero />
          {/* <Contact /> */}
        </section>
        {/* <section id="Projects">
          <div className="ProjectSection">
            <ProjectCollapse/>
          </div>
        </section> */}
    </div>
  );
};

export default Home;
