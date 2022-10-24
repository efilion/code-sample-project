import { gql } from "graphql-tag";

const typeDefs = gql`

    type Movie {
        id: ID!
        title: String!
        description: String!
        releaseYear: Int!
        duration: Int!
        rating: Int!
        likeCount: Int!
        dislikeCount: Int!
    }

    type Query {
        findMovies(filter: MovieFilter): MovieResultList!
        getMovie(id: ID!): Movie
    }

    type Mutation {
        createMovie(input: CreateMovieInput!): CreateMoviePayload!
        deleteMovie(input: DeleteMovieInput!): DeleteMoviePayload!
        updateMovie(input: UpdateMovieInput!): UpdateMoviePayload!
        likeMovie(input: LikeMovieInput!): LikeMoviePayload!
        dislikeMovie(input: DislikeMovieInput!): DislikeMoviePayload!
    }

    type MovieResultList {
        items: [Movie!]!
    }

    input MovieFilter {
        title: StringInput
    }

    input StringInput {
        contains: String
        startsWith: String
    }

    enum Status {
        SUCCESS
        FAIL
    }

    interface ProblemInterface {
        message: String!
    }

    input CreateMovieInput {
        id: ID
        title: String!
        description: String!
        releaseYear: Int!
        duration: Int!
        rating: Int!
    }

    type IdentifierAlreadyExistsProblem implements ProblemInterface {
        message: String!
    }

    union CreateMovieProblems = IdentifierAlreadyExistsProblem

    type CreateMoviePayload {
        movie: Movie
        status: Status!
        errors: [CreateMovieProblems!]
    }

    input UpdateMovieInput {
        id: ID!
        title: String
        description: String
        releaseYear: Int
        duration: Int
        rating: Int
        likeCount: Int
        dislikeCount: Int
    }

    type UpdateMoviePayload {
        movie: Movie
    }

    input DeleteMovieInput {
        id: ID!
    }

    type DeleteMoviePayload {
        movie: Movie
    }

    input LikeMovieInput {
        id: ID!
    }

    type LikeMoviePayload {
        movie: Movie
    }

    input DislikeMovieInput {
        id: ID!
    }

    type DislikeMoviePayload {
        movie: Movie
    }
`;

export default typeDefs;