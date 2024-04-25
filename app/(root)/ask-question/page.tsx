import React from "react";
import Question from "@/components/forms/Question";

const AskQuestion = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className={"mt-8"}>
        <Question />
      </div>
    </div>
  );
};

export default AskQuestion;
