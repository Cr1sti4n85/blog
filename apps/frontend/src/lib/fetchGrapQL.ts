import { BACKEND_URL } from "./constants";
import { getSession } from "./session";

export const fetchGrapQL = async (query: string, variables = {}) => {
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST", //with fetch api every graphql request must be a post
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const responseBody = await response.json();
  if (responseBody.errors) {
    throw new Error(
      `GraphQL error: ${responseBody.errors
        .map((err: { message: string }) => err.message)
        .join(", ")}`
    );
  }
  return responseBody.data;
};

export const authFetchGrapQL = async (query: string, variables = {}) => {
  const session = await getSession();

  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST", //with fetch api every graphql request must be a post
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const responseBody = await response.json();
  if (responseBody.errors) {
    throw new Error(
      `GraphQL error: ${responseBody.errors
        .map((err: { message: string }) => err.message)
        .join(", ")}`
    );
  }
  return responseBody.data;
};
