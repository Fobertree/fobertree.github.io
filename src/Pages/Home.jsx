import React from "react";
import Hero from "../Components/Hero";
import ProjectCard from "../Components/ProjectCard";

const Home = () => {
  return (
    <div className="Home">
      <Hero />
      Project Card
      <ProjectCard
        title="Test"
        text="testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesContent"
        imgSrc="../../public/images/flowfield1.png"
      />
      HOME PAGE
    </div>
  );
};

export default Home;
