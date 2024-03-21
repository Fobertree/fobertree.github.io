import React from "react";
import ScrollSpy from "react-ui-scrollspy";

// https://www.npmjs.com/package/react-ui-scrollspy

const Navbar = () => {
  return (
    <div className="Navbar-container">
      <div className="Navbar">
        <h1>Alexander Liu</h1>
        <div>
          <a href="/" id="Home">
            {" "}
            Home
          </a>
          <a id="Projects"> Projects </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
