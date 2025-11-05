"use server";

import z from "zod";
import { print } from "graphql";
import { SignupFormState } from "../types/formState";
import { signupFormSchema } from "../zodSchema/signupFormSchema";
import { fetchGrapQL } from "../fetchGrapQL";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../gqlQueries";
import { redirect } from "next/navigation";
import { loginFormSchema } from "../zodSchema/signInFormSchema";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";

export async function signUp(
  state: SignupFormState | undefined,
  payload: FormData
): Promise<SignupFormState> {
  const validatedFields = signupFormSchema.safeParse(
    Object.fromEntries(payload.entries())
  );

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(payload.entries()),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const data = await fetchGrapQL(print(CREATE_USER_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors)
    return {
      data: Object.fromEntries(payload.entries()),
      message: "Ocurrió un error",
    };
  redirect("/auth/signin");
}

export async function signIn(
  state: SignupFormState | undefined,
  payload: FormData
): Promise<SignupFormState> {
  const validatedFields = loginFormSchema.safeParse(
    Object.fromEntries(payload.entries())
  );

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(payload.entries()),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  try {
    const data = await fetchGrapQL(print(SIGN_IN_MUTATION), {
      input: {
        ...validatedFields.data,
      },
    });

    await createSession({
      user: {
        id: data.signIn.id,
        name: data.signIn.name,
        avatar: data.signIn.avatar,
      },
      accessToken: data.signIn.accessToken,
    });

    revalidatePath("/");
  } catch {
    return {
      data: Object.fromEntries(payload.entries()),
      message: "Inicio de sesión incorrecto",
    };
  }

  //redirect out of the try catch as it throws an exception
  redirect("/");
}
