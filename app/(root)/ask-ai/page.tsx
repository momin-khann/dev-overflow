import React from "react";
import { Metadata } from "next";
import AskForm from "./AskForm";

export const metadata: Metadata = {
  title: "Ask AI",
};

const AskAI = () => {
  return <AskForm />;
};
export default AskAI;
