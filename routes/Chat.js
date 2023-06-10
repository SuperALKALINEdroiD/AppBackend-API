const express = require('express');
const auth = require('../middlewares/Auth');
const chat = express.Router();

const { JoinRoom } = require('../controllers/JoinRoomController');
const { GetRooms } = require('../controllers/GetAllRooms');

// req.params: { key: val }

chat.get('/all', auth, GetRooms);
chat.post('/join', auth, JoinRoom);

module.exports = chat;
