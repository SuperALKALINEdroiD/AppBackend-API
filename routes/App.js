const express = require('express')
const appContent = express.Router();
const { random } = require('../controllers/RandomContentController');
const auth = require('../middlewares/Auth');

appContent.get('/random', auth, random);

module.exports = appContent;
