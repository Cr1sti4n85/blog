"use server";
import { print } from "graphql";
import { fetchGrapQL } from "../fetchGrapQL";
import { GET_POST_COMMENTS } from "../gqlQueries";
import { CommentEntity } from "../types/model.types";

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
