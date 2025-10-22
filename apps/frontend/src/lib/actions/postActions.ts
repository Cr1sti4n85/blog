"use server";
import { print } from "graphql";
import { fetchGrapQL } from "../fetchGrapQL";
import { GET_POSTS } from "../gqlQueries";
import { Post } from "../types/model.types";
import { transformTakeSkip } from "../helpers";

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
