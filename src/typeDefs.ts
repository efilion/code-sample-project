import { gql } from "graphql-tag";

const typeDefs = gql`

    type Movie {
        id: ID!
        "Movie title."
        title: String!
        "Summarizes the film's storyline."
        description: String!
        "First cinematic release."
        releaseYear: Int!
        "Total running time in seconds."
        duration: Int!
        "On a scale from 0 to 100."
        rating: Int!
        "How many times the movie has been liked."
        likeCount: Int!
        "How many times the movie has been disliked."
        dislikeCount: Int!
    }

    type Query {
        """
        List out all movies. Optionally, provide a filter to search by title.  

        ---

            query FindMovies($filter: MovieFilter) {  
                findMovies(filter: $filter) {  
                    items {  
                        id  
                        title  
                    }  
                }  
            }  
            {  
                "filter": {  
                    "title": {  
                        "startsWith": "Star"  
                    }  
                }  
            }
        """
        findMovies(filter: MovieFilter): MovieResultList!

        """
        Null if no movie is found matching the given ID.
        """
        getMovie(id: ID!): Movie
    }

    type Mutation {
        """
        Add a new movie to the database.

        ---

            mutation CreateMovie($input: CreateMovieInput!) {
                createMovie(input: $input) {
                    movide {
                        id
                        title
                    }
                }
                status
                errors {
                    ... on ProblemInterface {
                        message
                    }
                }
            }
            {
                "input": {
                    "title": "Avatar",
                    "description": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
                    "releaseYear": 2009,
                    "duration": 10920, // seconds
                    "rating": 78 // out of 100
                }
            }
        """
        createMovie(input: CreateMovieInput!): CreateMoviePayload!

        "Remove a movie from the database. Returns null movie if no movie is found by the given ID."
        deleteMovie(input: DeleteMovieInput!): DeleteMoviePayload!

        """
        Change one or more fields on a movie.

        ---

            mutation UpdateMovie($input: UpdateMovieInput!) {
                updateMovie(input: $input) {
                    movie {
                        id
                        title
                        description
                        rating
                    }
                }
            }
            {
                "input": {
                    "id": 1,
                    "description": "R2-D2 leads a mission to save the galaxy from the evil empire.",
                    "rating": 100
                }
            }
        """
        updateMovie(input: UpdateMovieInput!): UpdateMoviePayload!

        "Increment a movie's like count. Returns null movie if no movie is found by the given ID."
        likeMovie(input: LikeMovieInput!): LikeMoviePayload!

        "Increment a movie's dislike count. Returns null movie if no movie is found by the given ID."
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