import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter";
import { userFilters } from "@/data/filters";
import UserCard from "@/components/cards/UserCard";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps, UserType } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community"
}
const page = async ({ searchParams }: SearchParamsProps) => {
  const { users } = await getAllUsers({
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
          route={"/community"}
          iconPosition={"left"}
          placeholder={"Search Users"}
          otherClasses={"flex-1"}
        />

        <Filter
          filters={userFilters}
          otherClasses={"min-h-[56px] sm:min-w-[170px]"}
        />
      </div>

      {/* All Users */}
      <section className="mt-12 w-full flex flex-wrap gap-4">
        {users?.length > 0 ? (
          users.map((user: UserType) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href={"/sign-up"} className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </section>
  );
};

export default page;
