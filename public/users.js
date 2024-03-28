const mongoose = require('mongoose')
const bcrypt = requiere('bcrypt')
const saltRounds = 10;
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique}
});