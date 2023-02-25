const express = require('express');  // use express js
require('dotenv').config();  // use .env file

const app = express();
const PORT = process.env.PORT;  // access env variable

app.get('/', (req, res) => {
    res.send('git init');
});

app.listen(PORT, () => console.log('Running.'));

  