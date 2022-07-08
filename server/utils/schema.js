const { gql } = require("apollo-server")

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
  }

  type Query {
    getUsers: [User]
    getUser: User
  }

  type Mutation {
    registerUser(
      name: String!
      email: String!
      password: String!
      password2: String!
    ): UpdateResponse
  }

  type Mutation {
    loginUser(email: String!, password: String!): UpdateResponse
  }
  type UpdateResponse {
    success: Boolean!
    message: String!
    token: String!
  }
`
// maybe change this from User object to a UpdateResponse type with bool and status
//        getUser(id: ID!): User

module.exports = typeDefs
