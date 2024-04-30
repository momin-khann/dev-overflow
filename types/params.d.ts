import { IUser } from "@/models/user.model";

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
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}
