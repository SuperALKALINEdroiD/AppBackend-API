const express = require('express')
const userRoutes = express.Router();

const { signup } = require('../controllers/SignupController');
const { login } = require('../controllers/LoginController');

userRoutes.post('/signup', signup);
userRoutes.get('/login', login);

module.exports = userRoutes;