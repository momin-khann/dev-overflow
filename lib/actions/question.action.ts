"use server";

import { connectDB } from "@/lib/connectDB";

export const createQuestion = async (data: unknown) => {
  try {
    await connectDB();
  } catch (error) {
    console.error("question creation failed. ", error);
  }
};
