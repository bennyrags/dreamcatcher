
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "email" VARCHAR (100) UNIQUE NOT NULL,
    "first_name" VARCHAR (200) NOT NULL,
    "last_name" VARCHAR (200) NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "dreams" (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES "user",
    date date NOT NULL,
    description character varying(5000) NOT NULL,
    score_temp integer NOT NULL,
    score_mood integer NOT NULL,
    img_url character varying(100)
);

CREATE TABLE themes (
    id SERIAL PRIMARY KEY,
    theme_name character varying(100) NOT NULL,
    theme_description character varying(500),
    theme_creation_date date NOT NULL,
    user_id integer REFERENCES "user"
    );

CREATE TABLE themes_dreams (
    theme_id integer REFERENCES themes(id) ON DELETE CASCADE,
    dream_id integer REFERENCES dreams(id) ON DELETE CASCADE
);