const express = require('express');  // use express js
require('dotenv').config();  // use .env file
const app = express();
var cors = require('cors')
const database = require('./database');  // connect to database

const logger = require('./middlewares/Log');
const contentRoutes = require('./routes/App');
const chat = require('./routes/Chat');
const userRoutes = require('./routes/Users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(logger);

app.use('/', userRoutes);
app.use('/', contentRoutes);
app.use('/chat', chat);

const PORT = process.env.PORT;  // access env variable

app.listen(PORT, () => console.log(`Running on ${ PORT }`));  // run

  