import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const signInFormSchema = formSchema.pick({
  email: true,
  password: true,
});
