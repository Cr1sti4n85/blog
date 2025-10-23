import gql from "graphql-tag";

export const GET_POSTS = gql`
  query posts($skip: Float, $take: Float) {
    posts(skip: $skip, take: $take) {
      id
      title
      thumbnail
      content
      createdAt
      updatedAt
      slug
    }
    postCount
  }
`;

export const GET_POST_BY_ID = gql`
  query findPost($id: Int!) {
    singlePost(id: $id) {
      id
      title
      thumbnail
      content
      createdAt
      author {
        name
      }
      tags {
        id
        name
      }
    }
  }
`;
