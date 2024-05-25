"use server";

import { UserModel } from "@/models/user.model";
import { asyncHandler } from "@/helpers/asyncHandler";
import {
  CreateUserParams,
  SaveQuestionParams,
  SearchQueryParams,
  UpdateUserParams,
} from "@/types/params";
import { revalidatePath } from "next/cache";
import { QuestionModel } from "@/models/question.model";
import { TagModel } from "@/models/tag.model";
import { AnswerModel } from "@/models/answer.model";
import { FilterQuery } from "mongoose";

const getAllUsers = asyncHandler(
  async ({ searchQuery, filter }: SearchQueryParams) => {
    let query: FilterQuery<typeof UserModel> = {};
    let sortByFilter = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    switch (filter) {
      case "new_users":
        sortByFilter = { joinedAt: -1 };
        break;
      case "old_users":
        sortByFilter = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortByFilter = { reputation: -1 };
        break;
      default:
        break;
    }

    // get all users
    const users = await UserModel.find(query).sort(sortByFilter);

    if (!users) throw new Error("error fetching users.");

    return { users };
  },
);

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
  const { userId, updateData, path } = params;
  const user = await UserModel.findByIdAndUpdate(userId, updateData, {
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

const getSavedQuestions = asyncHandler(async (params: SearchQueryParams) => {
  const { userId, searchQuery, filter, page = 1, pageSize = 2 } = params;

  const skipAmount = (page - 1) * pageSize;

  if (!userId) throw new Error("user not logged in.");

  let query: FilterQuery<typeof UserModel> = {};
  let sortByFilter = {};

  if (searchQuery) {
    query.$or = [
      { title: { $regex: new RegExp(searchQuery, "i") } },
      { description: { $regex: new RegExp(searchQuery, "i") } },
    ];
  }

  switch (filter) {
    case "most_recent":
      sortByFilter = { createdAt: -1 };
      break;
    case "oldest":
      sortByFilter = { createdAt: 1 };
      break;
    case "most_voted":
      sortByFilter = { upvotes: -1 };
      break;
    case "most_viewed":
      sortByFilter = { views: -1 };
      break;
    case "most_answered":
      sortByFilter = { answers: -1 };
      break;
    default:
      break;
  }

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
      match: query,
      options: {
        sort: sortByFilter,
        skip: skipAmount,
        limit: pageSize + 1,
      },
    });

  const savedQuestions = questions.saved;

  const isNext = savedQuestions.length > pageSize;

  console.log(savedQuestions.length, pageSize);

  if (!questions) throw new Error("no saved questions found.");

  return { savedQuestions, isNext };
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
