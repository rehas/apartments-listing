## Apartment Listing Application

This app is built with: 

TypeScript / TypeORM (Postgres) / KoaServer

React - Redux 

## Installation

`git clone`

### Server Side

`cd server && npm install`

setup a postgres db named apartments on `postgres://${db_username}:${db_pwd}@localhost:5432/apartments`,

current username/pwd : postgres/secret

`npm run-script watch` to compile and watch

`npm run-script start` to start server and create entities / relations in DB

`ping localhost:4000`

### Client Side

`cd ../client && yarn install`

`yarn start`

open `localhost:3000`

#

Default server port = 4000
Default client port = 3000