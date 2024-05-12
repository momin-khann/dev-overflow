import { AnswerType } from "@/types";
import AnswerCard from "../cards/AnswerCard";
import { getUserAnswers } from "@/lib/actions/user.action";

interface Props {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ userId, clerkId }: Props) => {
  const result = await getUserAnswers({ userId });

  return (
    <>
      {result.answers.map((item: AnswerType) => (
        <AnswerCard
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes?.length!}
          createdAt={item.createdAt!}
        />
      ))}
    </>
  );
};

export default AnswersTab;
