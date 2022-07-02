const dotenv = require("dotenv").config()
const { ApolloServer, gql } = require("apollo-server")
const typeDefs = require("./utils/schema")
const resolvers = require("./utils/resolvers")
const colors = require("colors")
const connectDb = require("./config/db")

connectDb()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(() => {
  console.log("Server is running ")
})
