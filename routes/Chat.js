const express = require('express');
const auth = require('../middlewares/Auth');
const chat = express.Router();

// req.params: { key: val }

chat.get('/allRooms', auth);
chat.post('/:roomID', auth);

module.exports = chat;
