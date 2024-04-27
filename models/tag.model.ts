import { Schema, model, models, Document } from "mongoose";

interface Tag extends Document {
  name: string;
  description?: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const tagSchema = new Schema({
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

export const Tags = models.tags || model("tags", tagSchema);
