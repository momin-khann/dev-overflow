import { Schema, model, models, Document } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  description: string;
  views: number;
  upvotes: Schema.Types.ObjectId;
  downvotes: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    title: {
      type: String,
      required: [true, "question is required."],
    },
    description: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    upvotes: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    downvotes: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "tags",
      },
    ],
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "answers",
      },
    ],
    author: Schema.Types.ObjectId,
  },
  { timestamps: true },
);

export const QuestionModel =
  models.questions || model<IQuestion>("questions", questionSchema);
