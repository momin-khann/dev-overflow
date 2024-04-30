"use server";

import { CreateQuestionParams } from "@/types/params";
import { QuestionModel } from "@/models/question.model";
import { TagModel } from "@/models/tag.model";
import { revalidatePath } from "next/cache";
import { asyncHandler } from "@/helpers/asyncHandler";

const getQuestions = asyncHandler(async () => {
  // get all questions
  const questions = await QuestionModel.find({}).populate({
    path: "tags",
    model: TagModel,
  });

  if (!questions) throw new Error("error fetching questions");

  return questions;
});

const createQuestion = asyncHandler(async (params: CreateQuestionParams) => {
  const { title, description, tags, path } = params;

  // create question and save to db
  const question = await QuestionModel.create({
    title,
    description,
    // author,
  });

  if (!question) throw new Error("error creating question.");

  const tagDocuments = [];

  // create the tags or get them if they already exist
  for (const tag of tags) {
    const existingTag = await TagModel.findOneAndUpdate(
      { name: tag.toLowerCase() },
      {
        $setOnInsert: { name: tag },
        $push: { question: question._id },
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

export { getQuestions, createQuestion };
