import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PNF from "./Pages/PNF";
import Navbar from "./Components/Navbar";
import Contact from "./Pages/Contact";
// App router
// https://github.com/gitname/react-gh-pages
// https://stackoverflow.com/questions/71984401/react-router-not-working-with-github-pages
//import Layout from "./Pages/Layout";
/*
import About from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import PageNotFound from "./Pages/PageNotFound";

<Navbar />
      <Routes>
        <Route path={"/About"} element={<About />}></Route>
        <Route path={"/ContactUs"} element={<ContactUs />}></Route>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"*"} element={<PageNotFound />}></Route>
      </Routes>
      <Footer />

https://mui.com/material-ui/react-card/
*/

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/Contact"} element={<Contact />}></Route>
        <Route path={"*"} element={<PNF />}></Route>
      </Routes>
      Footer
    </div>
  );
}

export default App;

// https://saradoesseo.com/website-tips/parts-of-a-website/
// https://cming0721.medium.com/building-a-basic-landing-page-with-react-576d50d985f2
