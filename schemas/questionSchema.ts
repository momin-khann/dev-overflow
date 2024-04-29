import { z } from "zod";

export const questionSchema = z.object({
  title: z.string().min(2).max(150),
  description: z.string(),
  tags: z.array(z.string().min(3).max(15)).min(1).max(3),
});
