import { z } from "zod";

export const signinSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres"),
});

export const userSchema = z.object({
  name: z.string().min(2, "Nome precisa ter no mínimo 2 caracteres"),
  email: z.email("E-mail inválido"),
  type: z.enum(["admin", "user"]),
  password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres").optional(),
});