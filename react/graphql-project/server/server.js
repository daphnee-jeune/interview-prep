import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// definition for queries and mutation types
const typeDefs = `
 type Query {
  getUsers: [User] // returns list (array) of all users
  getUserById(id: ID!): User
 }
 type User {
  id: ID
  name: String
  age: Int
  isMarried: Boolean
 }
`;
const resolvers = {};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running at: ${url}`);
