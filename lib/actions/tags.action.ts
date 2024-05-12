"use server";

import { asyncHandler } from "@/helpers/asyncHandler";
import { UserModel } from "@/models/user.model";
import { TagModel } from "@/models/tag.model";
import { QuestionModel } from "@/models/question.model";

export const getTopInteractedTags = asyncHandler(async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) throw new Error("User not found.");

  return [
    { _id: "1", name: "tag" },
    { _id: "2", name: "tag2" },
  ];
});

export const getAllTags = asyncHandler(async () => {
  const tags = await TagModel.find({});

  if (!tags) throw new Error("Tags not found.");

  return tags;
});

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
