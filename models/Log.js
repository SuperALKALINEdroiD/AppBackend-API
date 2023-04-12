const mongoose = require('mongoose');

// Define the schema
const logSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const Log = mongoose.model('Logs', logSchema);

// Export the model
module.exports = Log;
