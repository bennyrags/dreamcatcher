# HORACE THE DREAMER

A dream app for dreamers. Dreamers can record their dreams, their mood and temp, add themes, and track their dreams over time.

## Getting Started

Fork and clone this app. Set up NPM and PostgreSQL using the steps listed in Development Setup Instructions section below. Use the database.sql file in the root folder to create the PostgreSQL database and table. I recommend using Postico to set up Postgres and Postman to test SQL queries.


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database, rename the db in server/modules/pool.js. Follow instructions in the /database.sql file.

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=secret code
    ```
 In `.env` file, replace `secret code` with some long random string for security. You can use a site like  [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `secret code`, you will get a warning.
 
NOTE: this repo uses [mailgun (MG)](https://www.mailgun.com/) to send 'forgot password' emails. To fully enact this feature, you will need to set up an account on the MG website, and then add a few vars to the .env file:

-EMAIL_ADDRESS: email address from which you want to send these emails 
-MG_Domain: the domain used by MG to send the emails (there is a sandbox option)
-MG_Key: key provided by MG for validation

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`


## Deployment

1. Create a new Heroku project
2. Create an Heroku Postgres database
3. Connect to the Heroku Postgres database from Postico
4. Create the necessary tables
5. Add an environment variable for `SERVER_SESSION_SECRET` with a random string for security
6. In the deploy section, select manual deploy
