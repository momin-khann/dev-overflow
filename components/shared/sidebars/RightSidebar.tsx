import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { QuestionType } from "@/types";
import { getHotTags } from "@/lib/actions/tags.action";
import { v4 as uuidv4 } from "uuid";

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const hotTags = await getHotTags();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[300px] flex-col overflow-y-auto border-l p-6 pt-32 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question: QuestionType) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {hotTags.map((tag: any) => (
            <RenderTag
              key={uuidv4()}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;

/*
 * -------- Sample Data -------
 * */

// const hotQuestions = [
//   { _id: 1, title: "How do I use express as a custom server in NextJS?" },
//   { _id: 2, title: "Cascading Deletes in SQLAlchemy?" },
//   { _id: 3, title: "How to Perfectly Center a Div with Tailwind CSS?" },
//   {
//     _id: 4,
//     title:
//       "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
//   },
//   { _id: 5, title: "Redux Toolkit Not Updating State as Expected" },
// ];
//
// const popularTags = [
//   { _id: 1, name: "javascript", totalQuestions: 5 },
//   { _id: 2, name: "react", totalQuestions: 5 },
//   { _id: 3, name: "next", totalQuestions: 5 },
//   { _id: 4, name: "vue", totalQuestions: 2 },
//   { _id: 5, name: "redux", totalQuestions: 10 },
// ];
