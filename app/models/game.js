var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// Supported sports
var sports = [
  'soccer',
  'basketball',
  'football',
  'baseball',
  'volleyball',
  'hockey',
  'tennis',
  'paintball'
];

// Game schema definition
var GameSchema = new Schema({
  sport: { type: String, required: true, enum: sports },
  geo: { type: [Number], index: '2d' },
  players:[ {user: { type: ObjectId, ref: 'User' }, joined_on: Date } ],
  max_players: { type: Number, required: true, min: 2, max: 40 },
  game_date: { type: Number, required: true },
  description: { type: String, max: 140, trim: true, default: '' },
  created_by: { type: ObjectId, ref: 'User' },
  created_on: { type: Date, default: Date.now },
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: { type: String, required: true, max: 255 },
    date: { type: Date, default: Date.now }
  }]
});


module.exports = mongoose.model('Game', GameSchema);
