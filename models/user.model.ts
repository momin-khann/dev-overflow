import { Schema, model, models, Document } from "mongoose";

interface User extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const userSchema = new Schema<User>({
  clerkId: {
    type: String,
    required: [true, "clerkId is required."],
  },
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
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

export const User = models.users || model<User>("users", userSchema);
