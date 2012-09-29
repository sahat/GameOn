var mongoose = require('mongoose');
var User = require('./users');
var Comment = require('./comments');

var db = require('server.js');

var GameSchema = new mongoose.Schema({
  creator_id: mongoose.Schema.Types.ObjectId,
  sport: String,
  longitude: Number,
  latitude: Number,
  players: {type: [User]},
  description: String, //TODO: 140 chars limit
  timestamp: Date,
  comments: {type: [Comment]}
});

var Game = db.model('Game', GameSchema);

module.exports = Game;
