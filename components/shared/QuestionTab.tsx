import { getUserQuestions } from "@/lib/actions/user.action";
import { QuestionType, SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

interface Props {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId });

  return (
    <>
      {result.questions.map((question: QuestionType) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId!}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionTab;
