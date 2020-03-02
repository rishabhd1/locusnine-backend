const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  mobile: {
    type: String,
    required: false
  },

  roleType: {
    type: String,
    required: true
  },

  status: {
    type: Boolean,
    required: true
  },

  createdAt: {
    type: Date
  },

  updatedAt: {
    type: Date
  }
});

module.exports = User = mongoose.model('user', UserSchema);
