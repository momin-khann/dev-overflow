import { Document, Schema, models, model } from "mongoose";

interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdAt: Date;
}

const interactionSchema = new Schema<IInteraction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "questions",
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: "answers",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "tags",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const InteractionModel =
  models.interactions || model<IInteraction>("interactions", interactionSchema);
