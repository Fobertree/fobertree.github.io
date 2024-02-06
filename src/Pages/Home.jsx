import React from "react";
import Hero from "../Components/Hero";
import ProjectCard from "../Components/ProjectCard";
//import flow from "../Components/images/flowfield1.png";

const Home = () => {
  return (
    <div className="Home">
      <Hero />
      Project Card
      <ProjectCard
        title="Test"
        text="testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttes\n\nContent"
        img={import("../Components/images/flowfield1.png").default}
      />
      HOME PAGE
    </div>
  );
};

export default Home;
