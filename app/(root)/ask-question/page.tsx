import React from "react";
import Question from "@/components/forms/Question";
import { getMongoUserId } from "@/helpers/getMongoUser";

const AskQuestion = async () => {
  const mongoUserId = await getMongoUserId();

  if (!mongoUserId) return <div>User not Logged In.</div>;

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className={"mt-8"}>
        <Question mongoUserId={mongoUserId} />
      </div>
    </div>
  );
};

export default AskQuestion;
