"use server";
import { print } from "graphql";
import { authFetchGrapQL, fetchGrapQL } from "../fetchGrapQL";
import {
  CREATE_POST_MUTATION,
  GET_POST_BY_ID,
  GET_POSTS,
  GET_USER_POSTS,
} from "../gqlQueries";
import { Post } from "../types/model.types";
import { transformTakeSkip } from "../helpers";
import { PostFormState } from "../types/formState";

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

  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.userPostCount as number,
  };
}

export async function saveNewPost(
  state: PostFormState,
  payload: FormData
): Promise<PostFormState> {}
