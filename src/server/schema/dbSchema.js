const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema languae
const schema = gql`
  scalar Date

  type Query {
    users: [User!]
    user(id: ID!): User

    comments: [Comment!]!
    comment(id: ID!): Comment!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    projects: [Project!]
    project(id: ID!): Project
  }
  type Project {
    id: ID!
    name: String!
    user: User!
    issues: [Issue!]
  }
  type Issue {
    id: ID!
    body: String!
    project: Project!
    comments: [Comment!]
  }
  type Comment {
    id: ID!
    body: String!
    resolved: Boolean!
    issue: Issue!
  }
  type Mutation {
    createComment(body: String!): Comment!
  }
`;

module.exports = schema;
