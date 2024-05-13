"use server";

import { asyncHandler } from "@/helpers/asyncHandler";
import { UserModel } from "@/models/user.model";
import { TagModel } from "@/models/tag.model";
import { QuestionModel } from "@/models/question.model";
import { SearchQueryParams } from "@/types/params";

export const getTopInteractedTags = asyncHandler(async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) throw new Error("User not found.");

  return [
    { _id: "1", name: "tag" },
    { _id: "2", name: "tag2" },
  ];
});

export const getAllTags = asyncHandler(
  async ({ searchQuery }: SearchQueryParams) => {
    const tags = await TagModel.find({
      name: { $regex: new RegExp(searchQuery, "i") },
    });

    if (!tags) throw new Error("Tags not found.");

    return tags;
  },
);

export const getQuestionsByTagId = asyncHandler(async (tagId: string) => {
  if (!tagId) throw new Error("no tag id");

  const questions = await TagModel.findById(tagId).populate({
    path: "questions",
    model: QuestionModel,
    options: {
      sort: { createdAt: -1 },
    },
    populate: [
      { path: "author", model: UserModel },
      { path: "tags", model: TagModel },
    ],
  });

  if (!questions) throw new Error("no tags found");

  return questions;
});

export const getHotTags = asyncHandler(async () => {
  const hotTags = await TagModel.aggregate([
    {
      $project: { _id: 0, name: 1, totalQuestions: { $size: "$questions" } },
    },
    { $sort: { totalQuestions: -1 } },
    { $limit: 5 },
  ]);

  if (!hotTags) throw new Error("No Tag Exist.");

  return hotTags;
});
