import React from "react";
import ProjectCollapseCard from "./ProjectCollapseCard";

/*
Add currently working on section
Tech stack section
Link resume
*/

const ProjectCollapse = () => {
    return (
        <>
            <div className="ProjectCollapse">
                <h2 style={{color: "lightgray"}}>Work Experience</h2>
                <ProjectCollapseCard
                title={"Meta"}
                description={[
                    <li>Incoming Software Engineering Intern (Seattle)</li>
                ]}
                tech_stack={":)"}
                label_id={"meta"}
                />
                <ProjectCollapseCard
                title={"AbbVie"}
                description={[
                    <li>Utilized Python boto3 Amazon Web Services library to handle AES encryption of PII in over 8 million records</li>,
                    <li>Redesigned AbbVie IBDDisk application with Figma to accommodate healthcare provider and patient needs</li>,
                    <li>Implemented new Imbruvica patient registration form with Google Maps API Autocomplete support in ReactJS</li>,
                    <li>Created dynamic API URL to PDF conversion endpoint in Python to disseminate Vraylar health plan coverage</li>,
                ]}
                tech_stack={"Python, AWS, ReactJS, Figma"}
                label_id={"abbv"}
                />
            </div>
            <div className="ProjectCollapse">
                <h2 style={{color: "lightgray"}}>Projects</h2>
            <ProjectCollapseCard
                title={"Eulerian Fluid Simulation"}
                description={"Implementing incompressible Eulerian Fluid Simulation based on Navier-Stokes, optimized with semi-Lagrangian advection, Courant-Friedrich-Lewy's condition, preconditioned (from Modified Incomplete Cholesky decomposition) conjugate gradient, etc. Currently rewriting from scratch."}
                tech_stack={"C++, OpenGL + GLSL + Eigen/GLM, CMake"}
                label_id={"fluid_sim"}
                url={"https://github.com/Fobertree/Eulerian-Fluid-Simulation"}
                url_text={"Github Repository"}
            />
            <ProjectCollapseCard
                title={"C++ Backtester"}
                description={"Implemented strategy backtester with pybind11 Python interface with custom DataFrame and progress bar classes. Building external libcurl Yahoo Finance API support and multi-threaded optimization with atomic Thread Pool."}
                tech_stack={"C++, pybind11, libcurl, CMake"}
                label_id={"backtester"}
                url={"https://github.com/Fobertree/Backtester"}
                url_text={"Github Repository"}
            />
            <ProjectCollapseCard
                title={"Casing Machine"}
                description={["Implemented Full-Stack casing interview preparation under a team of Emory and Georgia Tech students. Access website ", <a target="_blank" rel="noopener noreferrer" href = 'https://www.casing-machine.com/home'>here</a>, "."]}
                tech_stack={"JS, HTML/CSS, Pug, Firebase, GCP"}
                label_id={"casing_machine"}
            />
            <ProjectCollapseCard
                title={"Elon Musk Twitter Webscraper"}
                description={"Implemented webscraper in Selenium that scrapes the content of Elon Musk's tweets (including timestamps) with the intention of potentially creating a sentiment-analysis dataset. Created to bypass API limits on only fetching up to 100 most recent tweets from a user."}
                tech_stack={"Python, Selenium"}
                label_id={"elon_twitter"}
                url={"https://github.com/Fobertree/Elon-Twitter-Scraper"}
                url_text={"Github Repository"}
            />
            <ProjectCollapseCard
                title={"Algory API Dashboard"}
                description={["Maintain position information for ", <a href = 'https://www.algorycapital.com/' >Algory Capital's</a>, " dashboard."]}
                tech_stack={"JS, Express, HTML/CSS, Heroku, MongoDB, Python, Pug"}
                label_id={"algory"}
                url={"https://www.algorycapital.com/performance"}
                url_text={"Dashboard URL"}
            />
            <ProjectCollapseCard
                title={"Factor Investing Model"}
                description={["Implemented dynamic factor investing model in a team under ", <a href = 'https://www.algorycapital.com/' >Algory Capital</a>, " with adjustable weights and dynamic alphas."]}
                tech_stack={"Python"}
                label_id={"algory_factor_investing"}
            />
            <ProjectCollapseCard
                title={"Statistical Arbitrage"}
                description={["Implemented StatArb (mean-reversion) model in a team under ", <a href = 'https://www.algorycapital.com/' >Algory Capital</a>, "."]}
                tech_stack={"Python"}
                label_id={"algory_statarb"}
            />
        </div>
        </>
    )
}

export default ProjectCollapse;