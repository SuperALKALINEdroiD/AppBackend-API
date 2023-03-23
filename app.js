const express = require('express');  // use express js
require('dotenv').config();  // use .env file
const app = express();
const mongoose = require("mongoose");

const databse = require('./database');
const userRoutes = require('./routes/Users');


// app.use(express.json());

const PORT = process.env.PORT;  // access env variable

// app.get('/', (req, res) => {
//     res.send('git init');
// });

app.use('/', userRoutes);

app.listen(PORT, () => console.log(`Running on ${ PORT }`));

  