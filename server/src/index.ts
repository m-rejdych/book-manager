import express from 'express';
import jwt from 'express-jwt';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';

import resolvers from './modules/index';
import ExtendedRequest from './types/ExtendedRequest';
import { TOKEN_SECRET, PORT, API_URI } from './config';
import authChecker from './util/authChecker';

const main = async (): Promise<void> => {
  await createConnection();

  const schema = await buildSchema({ resolvers, authChecker });

  const app = express();
  app.use(cors());
  app.use(
    API_URI as string,
    jwt({
      secret: TOKEN_SECRET as string,
      credentialsRequired: false,
      algorithms: ['HS256'],
    }),
  );

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req, user: (req as ExtendedRequest).user }),
  });
  server.applyMiddleware({ app, cors: false });

  app.listen({ port: PORT, path: API_URI }, () =>
    console.log(`🎉 Server started at http://localhost:${PORT}${API_URI}`),
  );
};

main();
