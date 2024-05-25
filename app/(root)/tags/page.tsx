import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import { tagFilters } from "@/data/filters";
import { SearchParamsProps, TagType } from "@/types";
import { getAllTags } from "@/lib/actions/tags.action";
import NoResult from "@/components/shared/NoResult";
import { Badge } from "@/components/ui/badge";
import Pagination from "@/components/shared/Pagination";

const page: FunctionComponent<SearchParamsProps> = async ({ searchParams }) => {
  const { tags, isNext } = await getAllTags({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <section>
      {/*top header*/}
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold">All Users</h1>

        <Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      {/*search bar && filter*/}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={"/tags"}
          iconPosition={"left"}
          placeholder={"Search for users"}
          otherClasses={"flex-1"}
        />

        <Filter
          filters={tagFilters}
          otherClasses={"min-h-[56px] sm:min-w-[170px]"}
        />
      </div>

      {/* All Tags */}
      <section className="mt-12 w-full grid grid-col-1 xs:grid-cols-2 lg:grid-cols-3 gap-3">
        {tags.length > 0 ? (
          tags.map((tag: TagType) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-6 py-3 uppercase mx-auto text-white !text-[0.85rem]">
                  {tag.name}
                </Badge>

                <p className="small-medium text-center text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions?.length ?? 0}+
                  </span>
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </section>
  );
};

export default page;
