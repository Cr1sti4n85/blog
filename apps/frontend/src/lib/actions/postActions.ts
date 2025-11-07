"use server";
import { print } from "graphql";
import { authFetchGrapQL, fetchGrapQL } from "../fetchGrapQL";
import {
  CREATE_POST_MUTATION,
  GET_POST_BY_ID,
  GET_POSTS,
  GET_USER_POSTS,
  UPDATE_POST_MUTATION,
} from "../gqlQueries";
import { Post } from "../types/model.types";
import { transformTakeSkip } from "../helpers";
import { PostFormState } from "../types/formState";
import {
  PostFormSchema,
  UpdatePostFormSchema,
} from "../zodSchema/postFormSchema";
import z from "zod";
import { uploadThumbnail } from "../upload";

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGrapQL(print(GET_POSTS), { skip, take });

  return { posts: data.posts as Post[], totalPosts: data.postCount };
};

export const fetchPostsById = async (id: number) => {
  const data = await fetchGrapQL(print(GET_POST_BY_ID), { id });

  return data.singlePost as Post;
};

export async function fetchUserPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize: number;
}) {
  const { take, skip } = transformTakeSkip({ page, pageSize });
  const data = await authFetchGrapQL(print(GET_USER_POSTS), {
    take,
    skip,
  });

  console.log({ take, skip });
  console.log({ data });

  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.userPostCount as number,
  };
}

export async function saveNewPost(
  state: PostFormState,
  payload: FormData
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(payload.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(payload.entries()),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };

  let thumbnailUrl = "";

  if (validatedFields.data.thumbnail) {
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);
  }

  const data = await authFetchGrapQL(print(CREATE_POST_MUTATION), {
    input: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl,
    },
  });

  if (data) return { message: "Publicación guardada", ok: true };
  return {
    message: "Ocurrió un problema",
    data: Object.fromEntries(payload.entries()),
  };
}

export async function updatePost(
  state: PostFormState,
  payload: FormData
): Promise<PostFormState> {
  const validatedFields = UpdatePostFormSchema.safeParse(
    Object.fromEntries(payload.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(payload.entries()),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };

  // check if thumbnail has been changed
  const { thumbnail, ...inputs } = validatedFields.data;

  let thumbnailUrl = "";
  // Upload Thumbnail to supabase
  if (thumbnail) thumbnailUrl = await uploadThumbnail(thumbnail);

  const data = await authFetchGrapQL(print(UPDATE_POST_MUTATION), {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    },
  });

  if (data) return { message: "Post actualizado", ok: true };
  return {
    message: "Ocurrió un problema",
    data: Object.fromEntries(payload.entries()),
  };
}
