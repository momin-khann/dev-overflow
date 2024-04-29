"use server";

import { connectDB } from "@/lib/connectDB";
import { CreateQuestionParams } from "@/types/params";
import { QuestionModel } from "@/models/question.model";
import { TagModel } from "@/models/tag.model";
import { revalidatePath } from "next/cache";

export const getQuestions = async () => {
  try {
    await connectDB();

    // get all questions
    const questions = await QuestionModel.find({}).populate({
      path: "tags",
      model: TagModel,
    });

    return questions;
  } catch (error) {
    console.error("fetching questions failed", error);
    throw error;
  }
};

export const createQuestion = async (params: CreateQuestionParams) => {
  try {
    await connectDB();

    const { title, description, tags, path } = params;

    // create question and save to db
    const question = await QuestionModel.create({
      title,
      description,
      // author,
    });

    await question.save();

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
  } catch (error) {
    console.error("question creation failed. ", error);
    throw error;
  }
};
