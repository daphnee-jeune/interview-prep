import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// mock data
const users = [
  { id: "1", name: "Daphnée Jeune", age: 29, isMarried: false },
  { id: "2", name: "Ari Hart", age: 28, isMarried: false },
  { id: "3", name: "Yana Mixy", age: 30, isMarried: true },
];

// definition for queries and mutation types
const typeDefs = `
 type Query {
  getUsers: [User] // returns list (array) of all users
  getUserById(id: ID!): User
 }
 type Mutation {
  createUser(name: String!, age: Int!, isMarried: Boolean!): User
 }
 type User {
  id: ID
  name: String
  age: Int
  isMarried: Boolean
 }
`;
const resolvers = {
  Query: {
    getUsers: () => {
      return users; // get all users from db or trigger call to db collection
    },
    getUserById: (parent, args) => {
      const id = args.id;
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: (users.length + 1).toString(), // keep string to stay in sync with mock data
        name,
        age,
        isMarried
      };
      users.push(newUser)
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running at: ${url}`);
