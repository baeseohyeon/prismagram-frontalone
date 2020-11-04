import { gql } from "apollo-boost";

export const SEE_POST = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            user
            id
            files {
                url
            }
            likeCount
            isLiked
            comments
            createdAt
        }
    }
`;