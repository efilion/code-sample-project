import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';

import typeDefs from './typeDefs.js';
import { Resolvers } from './generated/graphql';

const prisma = new PrismaClient();

const resolvers: Resolvers = {

    Query: {

        findMovies: (parent, { filter }) => {
            let contains = filter?.title?.contains;
            let startsWith = filter?.title?.contains;
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
            let { id, title, description, release_year, duration, rating } = input;
            return prisma.movie.create({
                data: {
                    id: (id != null) ? parseInt(id) : undefined,
                    title,
                    description,
                    release_year,
                    duration,
                    rating
                }
            })
            .then(movie => ({movie}))
        },

        deleteMovie: (parent, { input }) => {
            return prisma.movie.delete({
                where: {
                    id: parseInt(input.id)
                }
            })
            .then(movie => ({movie}))
        },

        updateMovie: (parent, { input }) => {
            let { id, title, description, release_year, duration, rating, like_count, dislike_count } = input;
            return prisma.movie.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title,
                    description,
                    release_year,
                    duration,
                    rating,
                    like_count,
                    dislike_count
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
                    like_count: {
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
                    dislike_count: {
                        increment: 1
                    }
                }
            })
            .then(movie => ({movie}))
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