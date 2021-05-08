/* eslint-disable no-unused-expressions */

const express = require('express');
const oauthController = require('../controllers/oauthController');
const dbController = require('../controllers/dbController');

const router = express.Router();

router.get('/', oauthController.authWithGithub, oauthController.addUser, (req, res) => {
  res.status(200).json({ message: 'OAuth Success' });
});

module.exports = router;
