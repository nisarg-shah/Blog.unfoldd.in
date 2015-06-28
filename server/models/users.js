var mongoose = require('mongoose');

// Create the MovieSchema.
var UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
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
module.exports = UsersSchema;