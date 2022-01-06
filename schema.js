const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  Name: String,
  Age: Number
});

const User = mongoose.model('User', userSchema);
module.exports = User;
