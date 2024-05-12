import Metric from "../shared/Metric";
import { formatNumber, getTimestamp } from "@/helpers/sanitizer";
import Link from "next/link";
import { QuestionType, UserType } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteButtons from "@/components/shared/EditDeleteButtons";
import React from "react";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: Partial<QuestionType>;
  author: Partial<UserType>;
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showEditDelete = clerkId && clerkId === author?.clerkId;
  return (
    <Link
      href={`/question/${question?._id?.toString()}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex justify-between">
        <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
          <div>
            <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
              {getTimestamp(createdAt)}
            </span>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question?.title}
            </h3>
          </div>
        </div>

        <SignedIn>
          {showEditDelete && (
            <EditDeleteButtons type={"answer"} itemId={_id.toString()} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture!}
          alt="user avatar"
          value={author.name!}
          title={` • asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyles="body-medium text-dark400_light700"
          // isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
