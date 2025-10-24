import z from "zod";

export const signupFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.email("El email no es válido"),
  password: z
    .string("es obligatoria")
    .min(8, "debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "debe contener al menos una letra mayúscula")
    .regex(/\d/, "debe contener al menos un número")
    .regex(/[^a-zA-Z0-9]/, "debe contener al menos un carácter especial"),
});
