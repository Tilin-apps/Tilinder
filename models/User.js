// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  description: String,
  birthdate: Date,
  gender: String,
  phoneNumber: String,
  preferredGender: String,
  hobbies: [String],
  profilePhoto: String,
});

module.exports = mongoose.model('User', UserSchema);
