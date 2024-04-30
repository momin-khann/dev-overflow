import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import { homePageFilters } from "@/data/filters";

const page: FunctionComponent = () => {
  return (
    <main>
      {/*top header*/}
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold">All Users</h1>

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

      {/* All Users */}
      <section className="mt-12 flex flex-wrap gap-4">{/*  */}</section>
    </main>
  );
};

export default page;
