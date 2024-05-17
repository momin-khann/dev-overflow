import React from "react";
import Link from "next/link";
import { getTimestamp } from "@/helpers/sanitizer";
import Image from "next/image";
import Filter from "@/components/shared/Filter";
import { answerFilters } from "@/data/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import { AnswerType } from "@/types";
import ParseHTML from "@/components/shared/ParseHTML";
import Votes from "@/components/shared/Votes";

interface Props {
  totalAnswers: number;
  mongoUserId: string;
  questionId: string;
  page?: string;
  filter?: string;
}

const AllAnswers = async ({
  totalAnswers,
  questionId,
  mongoUserId,
  filter,
}: Props) => {
  const answers: Array<AnswerType> = await getAnswers({ questionId, filter });

  return (
    <div className={"mt-11"}>
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {`${totalAnswers} Answer${totalAnswers > 1 ? "s" : ""}`}
        </h3>
        {answers?.length > 0 && (
          <Filter
            filters={answerFilters}
            otherClasses={"min-h-[48px] sm:min-w-[150px]"}
          />
        )}
      </div>

      {/* Display all answers */}
      <div>
        {answers?.length > 0 &&
          answers.map((answer: AnswerType) => (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="flex items-center justify-between">
                <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-6">
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className="flex flex-1 items-start gap-1 sm:items-center"
                  >
                    <Image
                      src={answer.author.picture ?? "/assets/icons/avatar.svg"}
                      width={18}
                      height={18}
                      alt="profile"
                      className="rounded-full object-cover max-sm:mt-0.5"
                    />
                    <div className="flex flex-col sm:flex-row sm:gap-2 sm:items-center">
                      <p className="body-semibold text-dark300_light700">
                        {answer.author.name}
                      </p>

                      <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                        answered {getTimestamp(answer.createdAt!)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end">
                    <Votes
                      type={"answer"}
                      itemId={answer._id.toString()}
                      userId={mongoUserId}
                      upvotes={answer.upvotes?.length ?? 0}
                      downvotes={answer.downvotes?.length ?? 0}
                      hasUpVoted={answer.upvotes?.includes(mongoUserId)!}
                      hasDownVoted={answer.downvotes?.includes(mongoUserId)!}
                    />
                  </div>
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
