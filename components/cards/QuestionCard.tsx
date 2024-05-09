import React, { FunctionComponent } from "react";
import Link from "next/link";
import RenderTag from "@/components/shared/RenderTag";
import Metric from "@/components/shared/Metric";
import { getTimestamp } from "@/helpers/sanitizer";

interface OwnProps {
  _id: string;
  clerkId?: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

type Props = OwnProps;

const QuestionCard: FunctionComponent<Props> = ({
  _id,
  clerkId,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11 my-6">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex ">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture ? author.picture : "/assets/icons/avatar.svg"}
          alt={"user"}
          value={author?.name}
          title={""}
          href={`/profile/${author?._id}`}
          isAuthor={""}
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={Number(upvotes)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={answers.length}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={views}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
