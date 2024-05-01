import React from "react";
import Question from "@/components/forms/Question";
import { auth } from "@clerk/nextjs/server";

const AskQuestion = () => {
  const { userId } = auth();

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className={"mt-8"}>
        <Question clerkId={userId!} />
      </div>
    </div>
  );
};

export default AskQuestion;
