"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import { homePageFilters } from "@/data/filters";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { questions } from "@/data/questions";

export default function Home() {
  const { mode } = useTheme();

  return (
    <main>
      {/*top header*/}
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      {/*search bar && filter*/}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          iconPosition={"left"}
          placeholder={"Search for questions"}
          otherClasses={"flex-1"}
        />

        <Filter
          filters={homePageFilters}
          otherClasses={"min-h-[56px] sm:min-w-[170px]"}
          containerClasses={"hidden md:flex"}
        />
      </div>

      <HomeFilters />

      {questions.length > 0 ? (
        questions.map((question) => (
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
    </main>
  );
}
