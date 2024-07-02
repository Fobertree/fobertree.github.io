import React, { useRef } from "react";
import "./App.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PNF from "./Pages/PNF";
import Navbar from "./Components/Navbar";
import Algory from "./Pages/Algory";
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
          <Route exact path={"/algorydashboard/"} element={<Algory />} />
          <Route exact path={"/"} element={<Home />} />
          <Route path={"*"} element={<PNF />} />
        </Routes>
        <footer
          style={{ color: "white", textAlign: "center", padding: "20px" }}
        >
          Footer
        </footer>
      </div>
    </Router>
  );
}

export default App;

// https://saradoesseo.com/website-tips/parts-of-a-website/
// https://cming0721.medium.com/building-a-basic-landing-page-with-react-576d50d985f2
