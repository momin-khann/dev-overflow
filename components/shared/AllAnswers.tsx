import React from "react";
import Link from "next/link";
import { getTimestamp } from "@/helpers/sanitizer";
import Image from "next/image";
import Filter from "@/components/shared/Filter";
import { answerFilters } from "@/data/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import { AnswerType } from "@/types";
import ParseHTML from "@/components/shared/ParseHTML";

interface Props {
  totalAnswers: number;
  mongoUserId: string;
  questionId: string;
}

const AllAnswers = async ({ totalAnswers, questionId }: Props) => {
  const answers: Array<AnswerType> = await getAnswers(questionId);

  return (
    <div className={"mt-11"}>
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {`${totalAnswers} Answer${totalAnswers > 1 ? "s" : ""}`}
        </h3>
        <Filter filters={answerFilters} />
      </div>

      {/* Display all answers */}
      <div>
        {answers.length > 0 &&
          answers.map((answer: AnswerType) => (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="flex items-center justify-between">
                <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className="flex flex-1 items-start gap-1 sm:items-center"
                  >
                    <Image
                      src={""}
                      width={18}
                      height={18}
                      alt="profile"
                      className="rounded-full object-cover max-sm:mt-0.5"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="body-semibold text-dark300_light700">
                        {answer.author.name}
                      </p>

                      <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                        answered {getTimestamp(answer.createdAt!)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end">VOTING</div>
                </div>
              </div>

              <ParseHTML content={answer.answer} />
            </article>
          ))}
      </div>
    </div>
  );
};
export default AllAnswers;
