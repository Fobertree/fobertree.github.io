import React, { useRef } from "react";
import "./App.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PNF from "./Pages/PNF";
import Navbar from "./Components/Navbar";
// App router
// https://github.com/gitname/react-gh-pages
// https://stackoverflow.com/questions/71984401/react-router-not-working-with-github-pages
//import Layout from "./Pages/Layout";
// http://localhost:3000/#/algorydashboard/

function App() {
  const divRef = useRef();

  const scrollToElement = () => {
    const { current } = divRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Router>
      <div style={{ backgroundColor: "rgba(6, 12, 42, 0.89)" }}>
        <Navbar />
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route path={"*"} element={<PNF />} />
        </Routes>
        <footer
          style={{ color: "#aebdff", textAlign: "center", padding: "20px" }}
        >
          <a href="mailto:aliu266@emory.edu" target="_blank" rel="noreferrer" style={{textDecoration:"none", color: "#aebdff"}}>aliu266@emory.edu</a> | 224-358-1456
        </footer>
      </div>
    </Router>
  );
}

export default App;

// https://saradoesseo.com/website-tips/parts-of-a-website/
// https://cming0721.medium.com/building-a-basic-landing-page-with-react-576d50d985f2
