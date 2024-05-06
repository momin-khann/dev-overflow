import React, { FunctionComponent } from "react";
import { getQuestionById } from "@/lib/actions/question.action";
import Link from "next/link";
import Image from "next/image";
import Metric from "@/components/shared/Metric";
import { formatNumber, getTimestamp } from "@/helpers/sanitizer";
import RenderTag from "@/components/shared/RenderTag";
import ParseHTML from "@/components/shared/ParseHTML";
import Answer from "@/components/forms/Answer";
import { getMongoUserId } from "@/helpers/getMongoUser";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";

interface OwnProps {
  params: { id: string };
}

type Props = OwnProps;

const page: FunctionComponent<Props> = async ({ params }) => {
  const mongoUserId = await getMongoUserId();
  const question = await getQuestionById(params.id);

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type={"question"}
              itemId={question._id}
              userId={mongoUserId}
              upvotes={question.upvotes?.length ?? 0}
              downvotes={question.downvotes?.length ?? 0}
              hasUpVoted={question.upvotes?.includes(mongoUserId) ?? false}
              hasDownVoted={question.downvotes?.includes(mongoUserId) ?? false}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={`${getTimestamp(question.createdAt)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      {/*Render HTML*/}
      <ParseHTML content={question.description} />

      {/*Tags*/}
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={params.id}
        mongoUserId={mongoUserId}
        totalAnswers={question.answers.length}
      />

      {/* Answers */}
      <Answer mongoUserId={mongoUserId} questionId={params.id} />
    </>
  );
};

export default page;
