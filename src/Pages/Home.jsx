import React from "react";
import Hero from "../Components/Hero";
import ProjectCard from "../Components/ProjectCard";
import Contact from "../Components/Contact";
import ScrollSpy from "react-ui-scrollspy";
//import About from "../Components/About";
//import flow from "../Components/images/flowfield1.png";

const Home = () => {
  console.log("GETTING HOMT");
  return (
    <div className="Home">
      <ScrollSpy>
        <section data-to-scrollspy-id="Home">
          <Hero />
          <Contact />
        </section>
        <section data-to-scrollspy-id="Projects">
          <div className="ProjectSection">
            <ProjectCard
              title="Eulerian Fluid Simulation"
              text="Currently a work in progress. Motivated by Euler Equations and Eulerian Marker-and-Cell grid. Follows advection and pressure update methods. Written in C++ and OpenGL."
              img={import("../Components/images/flowfield1.png").default}
              url="https://github.com/Fobertree/Eulerian-Fluid-Simulation"
            />
            <ProjectCard
              title="Casing Machine"
              text="Website developed under Atlas Consulting Group as an internal tool for casing interview preparation. Now expanding beyond Atlas Consulting and adding new features."
              img={import("../Components/images/cmlogo.jpg").default}
              url="https://casing-machine.com/home"
            />
            <ProjectCard
              title="Wall Street Bets Sentiment Analysis"
              text="Currently a work in progress. Scraping training data from Wall Street Bets to create and train a BERT model, that will make investment decisions on a paper-traded Wall Street Bets portfolio."
              img={import("../Components/images/cmlogo.jpg").default}
              url="https://github.com/Fobertree/WSB-Sentiment-Analysis"
            />
          </div>
        </section>
      </ScrollSpy>
    </div>
  );
};

export default Home;
