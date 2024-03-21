import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
//import { basename } from "path";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="">
    <App />
  </BrowserRouter>
);

// https://stackoverflow.com/questions/63544289/how-to-highlight-navbar-links-on-page-scroll-in-react