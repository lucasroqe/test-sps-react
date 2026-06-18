import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Nome precisa ter no mínimo 2 caracteres."),
  email: z.email("Entre com um endereço de e-mail válido."),
  password: z.string().min(4, "Senha precisa ter no mínimo 4 caracteres."),
})

export default formSchema