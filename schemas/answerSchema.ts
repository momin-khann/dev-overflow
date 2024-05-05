import { z } from "zod";

export const answerSchema = z.object({
  answer: z.string(),
});
