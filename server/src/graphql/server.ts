import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { Context } from "@hr-app/shared";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers
})

await server.start();
export default server;