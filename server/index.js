require("dotenv").config()
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
    // get the token from the headers
    const token = req.headers.authorization || ""
    if (!token) return null

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      throw new Error("Invalid token")
    } else {
      const user = await User.findById(decoded.id)
      if (user) {
        return {
          user,
        }
      } else {
        return null
      }
    }
  },
})

server.listen().then(() => {
  console.log("Server is running ")
})
