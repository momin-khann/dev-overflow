"use server";

import { UserModel } from "@/models/user.model";
import { asyncHandler } from "@/helpers/asyncHandler";
import { CreateUserParams, UpdateUserParams } from "@/types/params";

const getAllUsers = asyncHandler(async () => {
  // get all users
});

const getUserById = asyncHandler(async (userId: string) => {
  // get all users
});

const createUser = asyncHandler(async (params: CreateUserParams) => {
  // create user to db
});

const updateUser = asyncHandler(async (params: UpdateUserParams) => {
  // update user to db
});

const deleteUser = asyncHandler(async (userId: string) => {
  // delete user from db.
});

export { getAllUsers, getUserById, createUser, deleteUser, updateUser };
