const { gql } = require("apollo-server")

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    password2: String!
    token: String
  }

  type Query {
    getUsers: [User]
    me: User
  }

  type Mutation {
    registerUser(
      name: String!
      email: String!
      password: String!
      password2: String!
    ): User
  }
`
// maybe change this from User object to a UpdateResponse type with bool and status
//        getUser(id: ID!): User

module.exports = typeDefs
