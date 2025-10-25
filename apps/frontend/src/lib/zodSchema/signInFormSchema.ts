import z from "zod";

export const loginFormSchema = z.object({
  email: z.email("El email no es válido"),
  password: z
    .string("es obligatoria")
    .min(8, "debe tener al menos 8 caracteres"),
});
