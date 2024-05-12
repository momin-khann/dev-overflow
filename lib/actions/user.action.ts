"use server";

import { UserModel } from "@/models/user.model";
import { asyncHandler } from "@/helpers/asyncHandler";
import {
  CreateUserParams,
  SaveQuestionParams,
  UpdateUserParams,
} from "@/types/params";
import { revalidatePath } from "next/cache";
import { QuestionModel } from "@/models/question.model";
import { TagModel } from "@/models/tag.model";
import { AnswerModel } from "@/models/answer.model";

const getAllUsers = asyncHandler(async () => {
  // get all users
  const users = await UserModel.find({});

  if (!users) throw new Error("error fetching users.");

  return users;
});

const getUserById = asyncHandler(async (clerkId: string) => {
  // get single users
  const user = await UserModel.findOne({ clerkId });

  if (!user) throw new Error("error fetching user.");

  return user;
});

export const getUserId = asyncHandler(async (clerkId: string) => {
  const user = await UserModel.findOne({ clerkId });

  if (!user) throw new Error("error fetching user.");

  return user._id;
});

const createUser = asyncHandler(async (params: CreateUserParams) => {
  // create user to db
  const user = await UserModel.create(params);

  if (!user) throw new Error("error creating user.");

  return user;
});

const updateUser = asyncHandler(async (params: UpdateUserParams) => {
  // update user to db
  const { clerkId, updateData, path } = params;
  const user = await UserModel.findOneAndUpdate({ clerkId }, updateData, {
    new: true,
  });

  if (!user) throw new Error("error updating user.");

  revalidatePath(path);

  return user;
});

const deleteUser = asyncHandler(async (clerkId: string) => {
  // delete user from db.
  const user = await UserModel.findOneAndDelete({ clerkId });

  if (!user) throw new Error("error deleting user.");

  // TODO: delete user ->
  //    questions, answers, comments, etc.

  return user;
});

const saveQuestion = asyncHandler(async (params: SaveQuestionParams) => {
  const { userId, questionId, path } = params;

  if (!userId) throw new Error("user not logged in.");

  const user = await UserModel.findById(userId);

  const isQuestionSaved = user.saved?.includes(questionId);

  if (isQuestionSaved) {
    await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { saved: questionId } },
      { new: true },
    );
  } else {
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { saved: questionId },
      },
      { new: true },
    );
  }

  revalidatePath(path!);
});

const getSavedQuestions = asyncHandler(async (userId: string) => {
  if (!userId) throw new Error("user not logged in.");

  const questions = await UserModel.findById(userId)
    .select("saved")
    .populate({
      path: "saved",
      model: QuestionModel,
      populate: [
        {
          path: "author",
          model: UserModel,
        },
        {
          path: "tags",
          model: TagModel,
        },
      ],
      options: {
        sort: { createdAt: -1 },
      },
    });

  if (!questions) throw new Error("no saved questions found.");

  return questions.saved;
});

const getUserQuestions = asyncHandler(async (params: any) => {
  const { userId } = params;

  const totalQuestions = await QuestionModel.countDocuments({ author: userId });

  const questions = await QuestionModel.find({ author: userId })
    .populate({ path: "author", model: UserModel })
    .populate("tags", "_id name")
    .sort({ views: -1, upvotes: -1 });

  return { totalQuestions, questions };
});

const getUserAnswers = asyncHandler(async (params: any) => {
  const { userId } = params;

  const totalAnswers = await AnswerModel.countDocuments({ author: userId });

  const answers = await AnswerModel.find({ author: userId })
    .sort({ upvotes: -1 })
    .populate("question", "_id title")
    .populate("author", "_id clerkId name picture")
    .exec();

  return { totalAnswers, answers };
});

export {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  saveQuestion,
  getSavedQuestions,
  getUserQuestions,
  getUserAnswers,
};
