const mongoose = require('mongoose');

// Define the schema
const chatSchema = new mongoose.Schema({
    ChatGroupID: {
        type: String,
        required: true,
        unique: true
    },
    ChatGroupName: {
        type: String,
        required: true
    },
    UserID: {
        type: String
    }
});

const ChatGroup = mongoose.model('ChatGroup', chatSchema);

module.exports = ChatGroup;
