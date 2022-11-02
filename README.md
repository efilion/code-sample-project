# Code Sample Backend Project

Implements an API to manage, search, and like/dislike movies.

**Technical Specifications:**
- GraphQL
- Node.js
- TypeScript
- PostgreSQL

**Functional Specifications:**
- Create, read, update, delete movies
- Search movies by title
- Anonymously like/dislike a movie
- A movie has a title, description, release year, duration, and rating

## Explore the API in the [Apollo Studio Explorer](https://studio.apollographql.com/sandbox/explorer)

The API is hosted at https://macho-knowledge-production.up.railway.app/, and it has introspection enabled. Providing the API's url as a connection for [Apollo Studio Explorer](https://studio.apollographql.com/sandbox/explorer) will generate a schema reference and query builder.

## Installing locally

### Initialize the database
The [postgres/init.sql](https://github.com/efilion/ensemble/blob/main/postgres/init.sql) file provides a script to initialize a new database with the required movie table.

### Configure the DATABASE_URL environment variable with the PostgreSQL connection string
Set the DATABASE_URL environment variable to your [connection string](https://www.prisma.io/docs/concepts/database-connectors/postgresql#base-url-and-path).

This can be provided within a .env file at the root of the project folder.
#### .env
> DATABASE_URL = "postgresql://user:password@host:port/ensemble?schema=public"

### Install packages
> npm install

### Build and Run
> npm start

The app will listen on the port defined in the PORT environment variable, or default to 4000.
