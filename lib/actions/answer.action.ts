"use server";

import { asyncHandler } from "@/helpers/asyncHandler";
import { AnswerModel } from "@/models/answer.model";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  UpdateAnswerParams,
} from "@/types/params";
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

export const upvoteAnswer = asyncHandler(async (params: AnswerVoteParams) => {
  const { answerId, userId, hasUpVoted, hasDownVoted, path } = params;

  if (!userId) throw new Error("User not Logged In");

  let query = {};

  if (hasUpVoted) {
    query = { $pull: { upvotes: userId } };
  } else if (hasDownVoted) {
    query = {
      $pull: { downvotes: userId },
      $push: { upvotes: userId },
    };
  } else {
    query = {
      $push: { upvotes: userId },
    };
  }

  const answer = await AnswerModel.findByIdAndUpdate(answerId, query, {
    new: true,
  });

  if (!answer) throw new Error("Error fetching answer");

  revalidatePath(path!);
});

export const downvoteAnswer = asyncHandler(async (params: AnswerVoteParams) => {
  const { answerId, userId, hasUpVoted, hasDownVoted, path } = params;

  if (!userId) throw new Error("User not Logged In");

  let query = {};

  if (hasDownVoted) {
    query = { $pull: { downvotes: userId } };
  } else if (hasUpVoted) {
    query = {
      $pull: { upvotes: userId },
      $push: { downvotes: userId },
    };
  } else {
    query = {
      $push: { downvotes: userId },
    };
  }

  const answer = await AnswerModel.findByIdAndUpdate(answerId, query, {
    new: true,
  });

  if (!answer) throw new Error("Error fetching answer");

  revalidatePath(path!);
});
