const mongoose = require('mongoose');

// Define the schema
const messageSchema = new mongoose.Schema({
  Sender: {
    type: String,
    required: true
  },
  Content: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  },
  ChatGroupID: {
    type: String,
    required: true
  },
  MessageID: {
    type: String,
    required: true,
    unique: true
  }
});

const Message = mongoose.model('Messages', messageSchema);

module.exports = Message;
