import { IUser } from "@/models/user.model";
import { Schema } from "mongoose";

export interface CreateQuestionParams {
  title: string;
  description: string;
  tags: string[];
  author: Schema.Types.ObjectId | User;
  path: string;
}

export interface EditQuestionParams {
  questionId: string;
  title: string;
  description: string;
  path: string;
}

export interface CreateAnswerParams {
  clerkId?: string;
  _id?: string;
  question: object;
  answer: string;
  author: object;
  upvotes?: object[];
  downvotes?: object[];
  createdAt: Date;
}

export interface UpdateAnswerParams {
  _id: string;
  clerkId?: string;
  question?: object;
  answer?: string;
  author?: object;
  upvotes?: object[];
  downvotes?: object[];
  createdAt?: Date;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved?: object[];
  joinedAt?: Date;
}

export interface UpdateUserParams {
  userId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  path?: string;
}

export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  path?: string;
}

export interface SaveQuestionParams {
  userId: string;
  questionId: string;
  path?: string;
}

export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface DeleteAnswerParams {
  answerId: string;
  path?: string;
}

export interface DeleteQuestionParams {
  questionId: string;
  path?: string;
}

export interface SearchQueryParams {
  userId?: string;
  searchQuery: string;
  filter: string;
  // page: string;
}
