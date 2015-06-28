var mongoose = require('mongoose');

// Create the MovieSchema.
var CommentsSchema = new mongoose.Schema({
  blogid: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  status: {
    type: Number,
    required: true,
    default:1
  }
});

// Export the model schema.
module.exports = CommentsSchema;