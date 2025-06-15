import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Le nom d'utilisateur doit au moins contenir 2 caractères.",
    })
    .max(50, {
      message: "Le nom d'utilisateur doit au maximum contenir 50 caractères.",
    }),
  email: z.string().email({ message: "Entrez un email valide." }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit au moins contenir 8 caractères." })
    .max(128, {
      message: "Le mot de passe doit au maximum contenir 128 caractères.",
    }),
});

export const signInFormSchema = formSchema.pick({
  email: true,
  password: true,
});
