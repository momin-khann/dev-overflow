import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { ParamsProps } from "@/types";
import { getMongoUserId } from "@/helpers/getMongoUser";

const Page = async ({ params }: ParamsProps) => {
  const mongoUserId = await getMongoUserId();

  if (!mongoUserId) return <div>User not Logged In.</div>;

  const questionDetails = await getQuestionById(params.id);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <Question
          type="edit"
          mongoUserId={mongoUserId}
          questionDetails={JSON.stringify(questionDetails)}
        />
      </div>
    </>
  );
};

export default Page;
