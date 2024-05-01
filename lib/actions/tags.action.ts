"use server";

import { asyncHandler } from "@/helpers/asyncHandler";
import { UserModel } from "@/models/user.model";
import { TagModel } from "@/models/tag.model";

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

  console.log(tags);

  return tags;
});
