/* eslint-disable arrow-body-style */
const { v4: uuidv4 } = require('uuid');
const { userData, projectsData, issueData, commentData } = require('../models/dummyData.js');

const resolvers = {
  Query: {
    users: () => {
      return Object.values(userData);
    },
    user: (parent, { id }) => {
      return userData[id];
    },
    comments: () => {
      return Object.values(commentData);
    },
  },
  User: {
    projects: (user) => {
      return Object.values(projectsData).filter(
        (project) => project.userId === user.id,
      );
    },
  },
  Project: {
    issues: (project) => {
      return Object.values(issueData).filter(
        (issue) => issue.projectId === project.id,
      );
    },
  },
  Issue: {
    comments: (issue) => {
      return Object.values(commentData).filter(
        (comment) => comment.issueId === issue.id,
      );
    },
  },

// ================== //
// ===== MUTATIONS ==== //
// ================== //

// Figure out how to add userId to comment when creating a comment

  Mutation: {
    createComment: (parent, { body }) => {
      const id = uuidv4();
      const comment = {
        id,
        body,
        // userId: users.id,
      };
      // comment[id] = comment;
      // users[id].commentIds.push(id);

      return comment;
    },
  },
};

module.exports = resolvers;
