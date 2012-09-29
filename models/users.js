var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String
  //email: String,
  //password: String,
  //avatar: String,
  //bio: String, // TODO: 140 chars limit
  //created_on: Date
});

module.exports = mongoose.model('User', UserSchema);