const { gql } = require("apollo-server")

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
  }

  type Project {
    name: String
    description: String
    User: User
  }

  type Query {
    getUsers: [User]
    getUser: User
    getProjects: [Project]
  }

  type Mutation {
    createProject(name: String, description: String): Project
  }

  type Mutation {
    registerUser(
      name: String
      email: String
      password: String
      password2: String
    ): User
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
