import React from "react";
import { Metadata } from "next";
import AskForm from "./AskForm";

export const metadata: Metadata = {
  title: "Ask AI",
};

const AskAI = () => {
  // ask ai

  return (
    // <main className="flex-1 flex flex-col">
    <AskForm />
  );
};
export default AskAI;
