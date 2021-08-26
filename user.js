var mongoose = require ('mongoose');
var User = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
})

module.exports = mongoose.model('User', User)
