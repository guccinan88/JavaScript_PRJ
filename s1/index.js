require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

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
    notes: () => notes,
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: "Adam Scott",
      };
      notes.push(noteValue);
      return noteValue;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then((res) => {
  server.applyMiddleware({ app, path: "/api" });
  app.listen({ port }, () =>
    console.log(`Server Start! Port:${port},${server.graphqlPath},${app}`)
  );
});
