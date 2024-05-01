"use server";

import { CreateQuestionParams } from "@/types/params";
import { QuestionModel } from "@/models/question.model";
import { TagModel } from "@/models/tag.model";
import { revalidatePath } from "next/cache";
import { asyncHandler } from "@/helpers/asyncHandler";
import { UserModel } from "@/models/user.model";

const getQuestions = asyncHandler(async () => {
  // get all questions
  const questions = await QuestionModel.find({})
    .populate({
      path: "tags",
      model: TagModel,
    })
    .populate({ path: "author", model: UserModel })
    .sort({ createdAt: -1 });

  if (!questions) throw new Error("error fetching questions");

  return questions;
});

const createQuestion = asyncHandler(async (params: CreateQuestionParams) => {
  const { title, description, tags, path, author } = params;

  // create question and save to db
  const question = await QuestionModel.create({
    title,
    description,
    author,
  });

  if (!question) throw new Error("error creating question.");

  const tagDocuments = [];

  // create the tags or get them if they already exist
  for (const tag of tags) {
    const existingTag = await TagModel.findOneAndUpdate(
      { name: tag.toLowerCase() },
      {
        $setOnInsert: { name: tag },
        $push: { questions: question._id },
      },
      {
        upsert: true,
        new: true,
      },
    );

    tagDocuments.push(existingTag._id);
  }

  await QuestionModel.findByIdAndUpdate(question._id, {
    $push: { tags: { $each: tagDocuments } },
  });

  revalidatePath(path);
});

const getQuestionById = asyncHandler(async (id: string) => {
  const question = await QuestionModel.findById(id)
    .populate({
      path: "tags",
      model: TagModel,
      select: "_id name",
    })
    .populate({
      path: "author",
      model: UserModel,
      select: "_id clerkId name picture",
    });

  if (!question) throw new Error("Question not found.");

  return question;
});

export { getQuestions, createQuestion, getQuestionById };
