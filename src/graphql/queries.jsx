import { gql } from '@apollo/client';

// Task 1: Fetch title and body of all posts
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      data {
        id
        userId
        title
        body
      }
    }
  }
`;

// Task 3: Filter posts based on userId 1
export const GET_POSTS_BY_USER = gql`
  query GetPostsByUser($userId: Int!) {
    posts(options: { filter: { userId: { eq: $userId } } }) {
      data {
        id
        userId
        title
        body
      }
    }
  }
`;
