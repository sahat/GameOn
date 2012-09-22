var mongoose = require('mongoose');

var db = mongoose.createConnection('localhost', 'test');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  bio: String, // TODO: 140 chars limit
  created_on: Date
});

var User = db.model('User', UserSchema);

module.exports = User;
