"use server";

import { asyncHandler } from "@/helpers/asyncHandler";
import { ViewQuestionParams } from "@/types/params";
import { QuestionModel } from "@/models/question.model";
import { InteractionModel } from "@/models/interaction.model";

export const viewQuestion = asyncHandler(async (params: ViewQuestionParams) => {
  const { questionId, userId } = params;

  await QuestionModel.findByIdAndUpdate(
    questionId,
    { $inc: { views: 1 } },
    { new: true },
  );

  if (!userId) return;

  if (userId) {
    const isVisited = await InteractionModel.findOne({
      question: questionId,
      user: userId,
      action: "view",
    });

    if (isVisited) return console.log("user already visited");

    await InteractionModel.create({
      question: questionId,
      user: userId,
      action: "view",
    });
  }
});
