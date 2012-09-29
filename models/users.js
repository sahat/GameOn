var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String
  //email: String,
  //password: String,
  //avatar: String,
  //bio: String, // TODO: 140 chars limit
  //created_on: Date
});

var db = mongoose.createConnection('localhost', 'test');

module.exports = db.model('User', UserSchema);