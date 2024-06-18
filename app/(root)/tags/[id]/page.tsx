import React from "react";
import { getQuestionsByTagId } from "@/lib/actions/tags.action";
import LocalSearchbar from "@/components/shared/search/LocalSearch";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { QuestionType } from "@/types";
import { capitalizeWord } from "@/helpers/sanitizer";

interface Props {
  id: string;
}

export async function generateMetadata({ params }: { params: Props }) {
  const tagQuestions = await getQuestionsByTagId(params.id);
  const { name } = tagQuestions;

  return { title: `${capitalizeWord(name)} Tag` };
}

const Page = async ({ params }: { params: Props }) => {
  const tagQuestions = await getQuestionsByTagId(params.id);

  const { name, questions } = tagQuestions;

  return (
    <main>
      <h1 className="h1-bold text-dark100_light900">{capitalizeWord(name)}</h1>
      <div className="mt-11 w-full">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length > 0 ? (
          questions.map((question: QuestionType) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </div>
    </main>
  );
};
export default Page;
