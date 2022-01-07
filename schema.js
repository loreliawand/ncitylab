const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  Name: {type: String, required: true, unique: true},
  Age: {type: Number, required: true}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
