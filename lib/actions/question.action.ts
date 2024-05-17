"use server";

import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  QuestionVoteParams,
  SearchQueryParams,
} from "@/types/params";
import { QuestionModel } from "@/models/question.model";
import { TagModel } from "@/models/tag.model";
import { revalidatePath } from "next/cache";
import { asyncHandler } from "@/helpers/asyncHandler";
import { UserModel } from "@/models/user.model";
import { AnswerModel } from "@/models/answer.model";
import { InteractionModel } from "@/models/interaction.model";
import { FilterQuery } from "mongoose";

const getQuestions = asyncHandler(
  async ({ searchQuery, filter }: SearchQueryParams) => {
    let query: FilterQuery<typeof QuestionModel> = {};
    let sortByFilter = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    switch (filter) {
      case "newest":
        sortByFilter = { createdAt: -1 };
        break;
      case "frequent":
        sortByFilter = { views: -1 };
        break;
      case "unanswered":
        query = { answers: { $size: 0 } };
        break;
      default:
        break;
    }

    // get all questions
    const questions = await QuestionModel.find(query)
      .populate({
        path: "tags",
        model: TagModel,
      })
      .populate({ path: "author", model: UserModel })
      .sort(sortByFilter);

    if (!questions) throw new Error("error fetching questions");

    return questions;
  },
);

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

const upvoteQuestion = asyncHandler(async (params: QuestionVoteParams) => {
  const { questionId, userId, hasUpVoted, hasDownVoted } = params;

  let updateQuery = {};

  if (hasUpVoted) {
    if (!hasDownVoted) updateQuery = { $pull: { upvotes: userId } };
  } else if (hasDownVoted) {
    if (!hasUpVoted)
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
  } else {
    updateQuery = { $push: { upvotes: userId } };
  }

  const question = await QuestionModel.findByIdAndUpdate(
    questionId,
    updateQuery,
    { new: true },
  );

  if (!question) throw new Error("Question not found.");

  revalidatePath(`/question/${questionId}`);
});

const downvoteQuestion = asyncHandler(async (params: QuestionVoteParams) => {
  const { questionId, userId, hasUpVoted, hasDownVoted } = params;

  let updateQuery = {};

  if (hasDownVoted) {
    updateQuery = { $pull: { downvotes: userId } };
  } else if (hasUpVoted) {
    updateQuery = {
      $pull: { upvotes: userId },
      $push: { downvotes: userId },
    };
  } else {
    updateQuery = { $push: { downvotes: userId } };
  }
  const question = await QuestionModel.findByIdAndUpdate(
    questionId,
    updateQuery,
    { new: true },
  );

  if (!question) throw new Error("Question not found.");

  revalidatePath(`/question/${questionId}`);
});

const editQuestion = asyncHandler(async (params: EditQuestionParams) => {
  const { questionId, title, description, path } = params;

  const question = await QuestionModel.findById(questionId).populate("tags");

  if (!question) {
    throw new Error("Question not found");
  }

  question.title = title;
  question.description = description;

  await question.save();

  revalidatePath(path);
});

const deleteQuestion = asyncHandler(async (params: DeleteQuestionParams) => {
  const { questionId, path } = params;

  await AnswerModel.deleteMany({ question: questionId });
  await InteractionModel.deleteMany({ question: questionId });
  await TagModel.updateMany(
    { questions: questionId },
    { $pull: { questions: questionId } },
  );
  await QuestionModel.findByIdAndDelete(questionId);

  revalidatePath(path!);
});

const getHotQuestions = asyncHandler(async () => {
  const hotQuestions = await QuestionModel.find({})
    .sort({ views: -1, upvotes: -1 })
    .limit(5);

  if (!hotQuestions) throw new Error("No Questions Exits.");

  return hotQuestions;
});

export {
  getQuestions,
  createQuestion,
  getQuestionById,
  upvoteQuestion,
  downvoteQuestion,
  editQuestion,
  deleteQuestion,
  getHotQuestions,
};
