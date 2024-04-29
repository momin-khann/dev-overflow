import { Schema } from "mongoose";
import { User } from "@/models/user.model";

export interface CreateQuestionParams {
  title: string;
  description: string;
  tags: string[];
  // author: Schema.Types.ObjectId | User;
  path: string;
}

export interface GetAnswersParams {}

export interface GetQuestionByIdParams {}

export interface CreateAnswerParams {}
