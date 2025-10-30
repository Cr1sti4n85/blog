"use server";
import { print } from "graphql";
import { authFetchGrapQL, fetchGrapQL } from "../fetchGrapQL";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { CommentEntity } from "../types/model.types";
import { CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchema/commentFormSchema";
import z from "zod";

export async function getPostComments({
  postId,
  skip,
  take,
}: {
  postId: number;
  skip: number;
  take: number;
}) {
  const data = await fetchGrapQL(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });

  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.postCommentCount as number,
  };
}

export async function saveComment(
  state: CreateCommentFormState,
  payload: FormData
): Promise<CreateCommentFormState> {
  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(payload.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      data: Object.fromEntries(payload.entries()),
    };
  }

  const data = await authFetchGrapQL(print(CREATE_COMMENT_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data) {
    return {
      message: "Comentario guardado",
      ok: true,
      open: false,
    };
  }

  return {
    message: "Ha ocurrido un problema",
    ok: false,
    open: true,
    data: Object.fromEntries(payload.entries()),
  };
}
