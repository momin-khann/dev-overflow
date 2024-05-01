"use client";

import React, { useEffect } from "react";
import parse from "html-react-parser";
import hljs from "highlight.js";
// import javascript from "highlight.js/lib/languages/javascript";

// import "highlight.js/styles/tokyo-night-dark.min.css";
// import "highlight.js/styles/github-dark.min.css";
import "highlight.js/styles/night-owl.min.css";

// hljs.registerLanguage("javascript", javascript);

interface Props {
  content: string;
}
function ParseHTML({ content }: Props) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return <div>{parse(content)}</div>;
}

export default ParseHTML;
