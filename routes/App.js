const express = require('express')
const appContent = express.Router();
const { random } = require('../controllers/RandomContentController');

appContent.get('/random', random);

module.exports = appContent;
