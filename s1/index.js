require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./db");
const models = require("./models");

const app = express();
const port = process.env.PORT || 3000;

let notes = [
  { id: "1", content: "This is a", author: "a" },
  { id: "2", content: "This is b", author: "b" },
];
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;
const resolvers = {
  Query: {
    hello: () => "Hello World",
    notes: async () => {
      return await models.Note.find();
    },
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    },
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: "Nan",
      });
    },
  },
};
db.connect();
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then((res) => {
  server.applyMiddleware({ app, path: "/api" });
  app.listen({ port }, () =>
    console.log(`Server Start! Port:${port},${server.graphqlPath},${app}`)
  );
});
