import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().max(50),
  username: z.string().max(50),
  portfolioWebsite: z.string().url(),
  location: z.string().max(80),
  bio: z.string().max(150),
});
