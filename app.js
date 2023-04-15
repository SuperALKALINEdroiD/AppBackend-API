const express = require('express');  // use express js
require('dotenv').config();  // use .env file
const app = express();

const mongoose = require("mongoose");
const database = require('./database');  // connect to database
const logger = require('./middlewares/Log');

const contentRoutes = require('./routes/App');
const userRoutes = require('./routes/Users');
app.use(logger);
app.use('/', userRoutes);
app.use('/', contentRoutes);

const PORT = process.env.PORT;  // access env variable

app.listen(PORT, () => console.log(`Running on ${ PORT }`));  // run

  