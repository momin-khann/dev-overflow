"use server";

import { UserModel } from "@/models/user.model";
import { asyncHandler } from "@/helpers/asyncHandler";
import { CreateUserParams, UpdateUserParams } from "@/types/params";
import { revalidatePath } from "next/cache";

const getAllUsers = asyncHandler(async () => {
  // get all users
  const users = await UserModel.find({});

  if (!users) throw new Error("error fetching users.");

  return users;
});

const getUserById = asyncHandler(async (userId: string) => {
  // get single users
  const user = await UserModel.findOne({ clerkId: userId });

  if (!user) throw new Error("error fetching user.");

  return user;
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

export { getAllUsers, getUserById, createUser, deleteUser, updateUser };
