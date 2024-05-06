import { Schema, model, models, Document } from "mongoose";

interface IAnswer extends Document {
  question: Schema.Types.ObjectId;
  answer: string;
  author: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const answerSchema = new Schema<IAnswer>(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: "questions",
      required: true,
    },
    answer: {
      type: String,
      trim: true,
      required: [true, "answer is required."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true },
);

export const AnswerModel = models.answers || model("answers", answerSchema);
