const axios = require('axios');
const { Octokit } = require('@octokit/core');
const { graphql } = require("@octokit/graphql");
require('dotenv').config();

let token = null;

const oauthController = {};

const clientID = process.env.GITHUB_AUTH_ID;
const clientSecret = process.env.GITHUB_AUTH_SECRET;

oauthController.authWithGithub = (req, res, next) => {
  console.log('inside authWithGithub');
  const body = {
    client_id: clientID,
    client_secret: clientSecret,
    code: req.query.code,
  };
  console.log(body);
  const opts = { headers: { accept: 'application/json' } };
  axios.post('https://github.com/login/oauth/access_token', body, opts)
    .then((result) => result.data.access_token)
    .then((_token) => {
      token = _token;
      console.log('My token:', token);
      next();
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

oauthController.addUser = async (req, res, next) => {
  const octokit = new Octokit({ auth: token });
  let data;
  data = await octokit.request("GET /user/repos")
  .then(() => {
    console.log('data', data);
    next();
  })
  .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = oauthController;
