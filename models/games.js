var mongoose = require('mongoose');

var db = mongoose.createConnection('localhost', 'test');

var GameSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  sport: String,
  longitude: Number,
  latitude: Number,
  players: Array,
  description: String, //TODO: 140 chars limit
  timestamp: Date,
  comments: {type: [CommentSchema]};
});

var Game = db.model('Game', GameSchema);

module.exports = Game;
