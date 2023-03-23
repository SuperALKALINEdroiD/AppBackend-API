const mongoose = require('mongoose');

// Define the schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const Post = mongoose.model('Post', postSchema);

// Export the model
module.exports = Post;
