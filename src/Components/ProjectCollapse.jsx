"use client";

import ProjectCollapseCard from "./ProjectCollapseCard";

const ProjectCollapse = () => {
  return (
    <>
      <div>
        <h2 style={{ color: "lightgray", background: "white" }}>
          Work Experience
        </h2>

        <ProjectCollapseCard
          title="Meta"
          description={[
            <li key="m1">
              Increased clickthrough rate in Meta Account registration by 20% via contextual account-linking welcome screens
            </li>,
            <li key="m2">
              Upgraded Android/iOS Instagram Launchers with flexible deeplink handling in Kotlin and Objective-C++
            </li>,
            <li key="m3">
              Deployed abstract factory framework and codegen for Horizon account linking
            </li>,
            <li key="m4">
              Integrated ML vector embedding search for Horizon avatar assets
            </li>,
          ]}
          tech_stack="Hack (PHP), Objective-C++, Kotlin, ReactJS, GraphQL, internal tooling"
          label_id="meta"
        />

        <ProjectCollapseCard
          title="AbbVie"
          description={[
            <li key="a1">
              Used AWS boto3 to handle AES encryption of PII across 8M+ records
            </li>,
            <li key="a2">
              Redesigned healthcare UI in Figma for provider/patient workflows
            </li>,
            <li key="a3">
              Built React + Google Maps autocomplete registration system
            </li>,
            <li key="a4">
              Built Python API for PDF generation of coverage data
            </li>,
          ]}
          tech_stack="Python, AWS, React, Figma"
          label_id="abbv"
        />
      </div>

      <div>
        <h2 style={{ color: "lightgray" }}>Projects</h2>

        <ProjectCollapseCard
          title="Eulerian Fluid Simulation"
          description="Navier-Stokes Eulerian fluid simulation using semi-Lagrangian advection, CFL condition, MIC-preconditioned conjugate gradient, etc."
          tech_stack="C++, OpenGL + GLSL + Eigen/GLM, CMake"
          label_id="fluid_sim"
          url="https://github.com/Fobertree/Eulerian-Fluid-Simulation"
          url_text="GitHub Repository"
        />

        <ProjectCollapseCard
          title="Casing Machine"
          description={[
            "Full-stack casing interview prep tool. Visit ",
            <a
              key="casing"
              href="https://www.casing-machine.com/home"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>,
            ".",
          ]}
          tech_stack="JS, HTML/CSS, Pug, Firebase, GCP"
          label_id="casing_machine"
        />

        <ProjectCollapseCard
          title="Elon Musk Twitter Webscraper"
          description="Selenium scraper for Elon Musk tweets with timestamps for sentiment dataset creation."
          tech_stack="Python, Selenium"
          label_id="elon_twitter"
          url="https://github.com/Fobertree/Elon-Twitter-Scraper"
          url_text="GitHub Repository"
        />

        <ProjectCollapseCard
          title="Algory API Dashboard"
          description={[
            "Maintained position dashboard for ",
            <a
              key="algory"
              href="https://www.algorycapital.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Algory Capital
            </a>,
            ".",
          ]}
          tech_stack="JS, Express, MongoDB, Heroku, Python"
          label_id="algory"
          url="https://www.algorycapital.com/performance"
          url_text="Dashboard"
        />

        <ProjectCollapseCard
          title="Factor Investing Model"
          description={[
            "Dynamic factor model built under ",
            <a
              key="factor"
              href="https://www.algorycapital.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Algory Capital
            </a>,
            ".",
          ]}
          tech_stack="Python"
          label_id="algory_factor_investing"
        />

        <ProjectCollapseCard
          title="Statistical Arbitrage"
          description={[
            "Mean reversion model built under ",
            <a
              key="statarb"
              href="https://www.algorycapital.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Algory Capital
            </a>,
            ".",
          ]}
          tech_stack="Python"
          label_id="algory_statarb"
        />
      </div>
    </>
  );
};

export default ProjectCollapse;