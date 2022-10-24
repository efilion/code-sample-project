import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Prisma, PrismaClient } from '@prisma/client';

import typeDefs from './typeDefs.js';
import { IdentifierAlreadyExistsProblem, Resolvers, Status } from './generated/graphql.js';

import _ from 'lodash';

const prisma = new PrismaClient();

const resolvers: Resolvers = {

    Query: {

        findMovies: (parent, { filter }) => {
            let contains = filter?.title?.contains;
            let startsWith = filter?.title?.startsWith;
            return prisma.movie.findMany({
                where: {
                    title: {
                        contains,
                        startsWith
                    }
                }
            })
            .then(items => ({items})) 
        },

        getMovie: (parent, { id }) => prisma.movie.findUnique({
            where: {
                id: parseInt(id)
            }
        })
    },

    Mutation: {

        createMovie: (parent, { input }) => {
            let { id, title, description, releaseYear, duration, rating } = input;
            return prisma.movie.create({
                data: {
                    id: (id != null) ? parseInt(id) : undefined,
                    title,
                    description,
                    releaseYear,
                    duration,
                    rating
                }
            })
            .then(movie => ({movie, status: Status.Success }))
            .catch((e) => {
                if (e instanceof Prisma.PrismaClientKnownRequestError
                    && e.code === 'P2002'
                    && _.isEqual(e.meta, {target: ['id']})
                ) { // Optional ID already is not unique
                    return {
                        status: Status.Fail,
                        errors: [{message: "Identifier already exists."} as IdentifierAlreadyExistsProblem]
                    } 
                }
                else {
                    console.log(e);
                    throw e;
                }
            })
        },

        deleteMovie: (parent, { input }) => {
            return prisma.movie.delete({
                where: {
                    id: parseInt(input.id)
                }
            })
            .then(movie => ({movie}))
            .catch((e) => {
                if (e instanceof Prisma.PrismaClientKnownRequestError
                    && e.code === 'P2025'
                ) { // No movie found with given ID.
                    return {movie: null};
                }
                else {
                    console.log(e);
                    throw e;
                }
            })
        },

        updateMovie: (parent, { input }) => {
            let { id, title, description, releaseYear, duration, rating, likeCount, dislikeCount } = input;
            return prisma.movie.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title,
                    description,
                    releaseYear,
                    duration,
                    rating,
                    likeCount,
                    dislikeCount
                }
            })
            .then(movie => ({movie}))
        },

        likeMovie: (parent, { input }) => {
            return prisma.movie.update({
                where: {
                    id: parseInt(input.id)
                },
                data: {
                    likeCount: {
                        increment: 1
                    }
                }
            })
            .then(movie => ({movie}))
        },

        dislikeMovie: (parent, { input }) => {
            return prisma.movie.update({
                where: {
                    id: parseInt(input.id)
                },
                data: {
                    dislikeCount: {
                        increment: 1
                    }
                }
            })
            .then(movie => ({movie}))
        }
    },

    CreateMovieProblems: {
        __resolveType(obj) {
            if(_.isEqual(['message'], Object.keys(obj))) {
                return 'IdentifierAlreadyExistsProblem';
            }
            return null;
        }
    }
};

const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    introspection: true
});

const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT || "4000") }
});

console.log(`🚀 Server ready at: ${url}`);