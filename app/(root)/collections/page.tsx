import React, { FunctionComponent } from "react";
import { QuestionType, SearchParamsProps } from "@/types";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { getMongoUserId } from "@/helpers/getMongoUser";
import Filter from "@/components/shared/Filter";
import { questionFilters } from "@/data/filters";
import LocalSearchbar from "@/components/shared/search/LocalSearch";

const page: FunctionComponent<SearchParamsProps> = async ({ searchParams }) => {
  const userId = await getMongoUserId();
  const savedQuestions = await getSavedQuestions({
    userId,
    searchQuery: searchParams?.q,
  });

  return (
    <main>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={questionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-6 flex w-full flex-col gap-6">
        {savedQuestions?.length > 0 ? (
          savedQuestions.map((question: QuestionType) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title={"There's no question to show"}
            description="Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link={"/ask-question"}
            linkTitle={"Ask a Question"}
          />
        )}
      </div>
    </main>
  );
};

export default page;
