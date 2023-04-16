const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  DateTime: {
    type: String,
    required: true
  }, 
  Type: {
    type: String,
    required: true
  },
  Name: {
    type: String
  }, 
  Token: {
    type: String,
    required: true,
    unique: true
  },
});

// Create a model from the schema
const user = mongoose.model('User', userSchema, 'users');

// Export the model
module.exports = user;
