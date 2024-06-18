import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
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
  saved?: Schema.Types.ObjectId[];
  joinedAt?: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: [true, "clerkId is required."],
    index: true,
  },
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: String,
  bio: String,
  picture: String,
  location: String,
  portfolioWebsite: String,
  reputation: {
    type: Number,
    default: 0,
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "questions",
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = models.users || model<IUser>("users", userSchema);
