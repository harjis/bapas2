import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import "reflect-metadata";
import compression from 'compression';
import cors from 'cors';
import depthLimit from 'graphql-depth-limit';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from "typeorm";
import { createServer } from 'http';

import schema from './schema';
import { AuthError, initialize, authorize } from "./authorization";

createConnection().then(async connection => {
  const app = express();
  const server = new ApolloServer({
    schema,
    validationRules: [ depthLimit(7) ],
    context: context => {
      if (!context.req.headers.authorization){
        throw new AuthError('No Authorization token provided');
      }
      return authorize(context.req.headers.authorization);
    }
  });
  app.use('*', cors());
  initialize(app);
  app.use(compression());
  server.applyMiddleware({ app, path: '/graphql' });
  const httpServer = createServer(app);
  httpServer.listen(
    { port: 3000 },
    (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`)
  );

}).catch(error => console.log("TypeORM connection error: ", error));
