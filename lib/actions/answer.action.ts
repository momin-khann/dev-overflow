"use server";

import { asyncHandler } from "@/helpers/asyncHandler";
import { AnswerModel } from "@/models/answer.model";
import { CreateAnswerParams, UpdateAnswerParams } from "@/types/params";
import { UserModel } from "@/models/user.model";
import { QuestionModel } from "@/models/question.model";
import { revalidatePath } from "next/cache";

export const getAnswers = asyncHandler(async (questionId: string) => {
  const answers = await AnswerModel.find({ question: questionId })
    .populate({
      path: "author",
      model: UserModel,
      select: "_id name picture ",
    })
    .sort({ createdAt: -1 });

  if (!answers) throw new Error("error fetching answers.");

  return answers;
});

export const createAnswer = asyncHandler(async (params: CreateAnswerParams) => {
  const { question: questionId } = params;

  const answer = await AnswerModel.create(params);

  await QuestionModel.findByIdAndUpdate(questionId, {
    $push: { answers: answer._id },
  });

  if (!answer) throw new Error("error creating answer.");

  revalidatePath(`/question/${questionId}`);
});

export const updateAnswer = asyncHandler(async (params: UpdateAnswerParams) => {
  const { _id, ...updateData } = params;
  const answer = await AnswerModel.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!answer) throw new Error("error updating answer.");

  return answer;
});

export const deleteAnswer = asyncHandler(async (id: string) => {
  const answer = await AnswerModel.findByIdAndDelete(id);

  if (!answer) throw new Error("error deleting answer.");

  return answer;
});
