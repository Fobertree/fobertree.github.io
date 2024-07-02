import React, { useEffect, useState } from "react";
import axios from "axios";

//const path = "../../public/HTML/dashboard.html";
// https://macarthur.me/posts/script-tags-in-react/
// Cursed spaghetti trying to get a solution for algory dashboard on wix

// html fetched but doesn't execute script tags
const path = "http://127.0.0.1:5500/public/HTML/dashboard.html";

const Algory = () => {
  const [htmlContent, setHtmlContent] = useState("");

  const executeScripts = () => {
    const scripts = document.getElementsByTagName("script");
    for (let script of scripts) {
      const scriptContent = script.innerHTML;
      const newScript = document.createElement("script");
      newScript.type = "text/javascript";
      newScript.text = scriptContent;
      document.body.appendChild(newScript);
    }
  };

  useEffect(() => {
    axios
      .get(path)
      .then((res) => setHtmlContent(res.data))
      .catch((err) => console.error("Error fetching HTML: ", err));
  }, []);
  console.log("HTML Fetched");
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
};

export default Algory;
