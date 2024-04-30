import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  description?: string;
  questions: Schema.Types.ObjectId[];
  followers?: Schema.Types.ObjectId[];
  createdOn?: Date;
}

const tagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: [true, "name is required."],
    unique: true,
  },
  description: {
    type: String,
    // required: [true, ]
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "questions",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export const TagModel = models.tags || model<ITag>("tags", tagSchema);
