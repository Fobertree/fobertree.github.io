import React from "react";
import ProjectCollapseCard from "./ProjectCollapseCard";

const ProjectCollapse = () => {
    return (
        <>
            <div className="ProjectCollapse">
                <h2 style={{color: "lightgray"}}>Work Experience</h2>
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
                description={"Implementing incompressible Eulerian Fluid Simulation based on Navier Stokes, optimized with semi-Lagrangian advection, Courant-Friedrich-Lewy's condition, preconditioned (from Cholesky decomposition) conjugate gradient, etc."}
                tech_stack={"C++, OpenGL + GLSL + Eigen/GLM, CMake"}
                label_id={"fluid_sim"}
            />
            <ProjectCollapseCard
                title={"C++ Backtester"}
                description={"Implemented strategy backtester with pybind11 Python interface with custom DataFrame and progress bar classes. Building external libcurl Yahoo Finance API support and multi-threaded optimization with atomic Thread Pool."}
                tech_stack={"C++, pybind11, libcurl, CMake"}
                label_id={"backtester"}
            />
            <ProjectCollapseCard
                title={"Elon Musk Twitter Webscraper"}
                description={"Implemented webscraper in Selenium that scrapes the content of Elon Musk's tweets (including timestamps) with the intention of potentially creating a sentiment-analysis dataset. Created to bypass API limits on only fetching up to 100 most recent tweets from a user."}
                tech_stack={"Python, Selenium"}
                label_id={"elon_twitter"}
            />
            <ProjectCollapseCard
                title={"Algory API Dashboard"}
                description={["Main position information for ", <a href = 'https://www.algorycapital.com/' >Algory Capital's</a>, " dashboard."]}
                tech_stack={"JS, HTML/CSS, Heroku, MongoDB, Python, Pug"}
                label_id={"algory"}
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