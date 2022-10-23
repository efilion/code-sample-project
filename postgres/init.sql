create database ensemble;

\connect ensemble
create table movie (
    id serial PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    release_year integer NOT NULL CHECK(RELEASE_YEAR > 1800),
    duration integer NOT NULL CHECK(DURATION > 0),
    rating integer NOT NULL CHECK(RATING >=0 AND RATING <= 100),
    like_count integer NOT NULL DEFAULT 0,
    dislike_count integer NOT NULL DEFAULT 0
);