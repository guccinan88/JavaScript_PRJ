require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();
const port = process.env.PORT || 3000;

let notes = [
  { id: "1", content: "This is a", author: "a" },
  { id: "2", content: "This is b", author: "b" },
];

db.connect();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  },
});
server.start().then((res) => {
  server.applyMiddleware({ app, path: "/api" });
  app.listen({ port }, () =>
    console.log(`Server Start! Port:${port},${server.graphqlPath},${app}`)
  );
});
