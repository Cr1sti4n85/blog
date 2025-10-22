"use server";
import { print } from "graphql";
import { fetchGrapQL } from "../fetchGrapQL";
import { GET_POSTS } from "../gqlQueries";
import { Post } from "../types/model.types";

export const fetchPosts = async () => {
  const data = await fetchGrapQL(print(GET_POSTS));
  return data.posts as Post[];
};
