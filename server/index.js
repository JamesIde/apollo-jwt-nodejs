const dotenv = require("dotenv").config()
const { ApolloServer, gql } = require("apollo-server")
const typeDefs = require("./utils/schema")
const resolvers = require("./utils/resolvers")
const colors = require("colors")
const jwt = require("jsonwebtoken")
const connectDb = require("./config/db")
const User = require("./models/User")

connectDb()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization.split(" ")[1] || ""

    if (!token) {
      throw new Error("You must be logged in to do that!")
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodedToken.id).select("-password")

    return {
      user: req.user,
    }
  },
})

server.listen().then(() => {
  console.log("Server is running ")
})
