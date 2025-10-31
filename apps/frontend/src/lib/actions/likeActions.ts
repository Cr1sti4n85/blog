"use server";
import { print } from "graphql";
import { authFetchGrapQL } from "../fetchGrapQL";
import {
  LIKE_POST_MUTATION,
  POST_LIKES,
  UNLIKE_POST_MUTATION,
} from "../gqlQueries";

export async function getPostLikeData(postId: number) {
  const data = await authFetchGrapQL(print(POST_LIKES), {
    postId,
  });

  return {
    likeCount: data.postLikesCount as number,
    userLikedPost: data.userLikePost as boolean,
  };
}

export async function likePost(postId: number) {
  const data = await authFetchGrapQL(print(LIKE_POST_MUTATION), {
    postId,
  });
}

export async function unlikePost(postId: number) {
  const data = await authFetchGrapQL(print(UNLIKE_POST_MUTATION), {
    postId,
  });
}
