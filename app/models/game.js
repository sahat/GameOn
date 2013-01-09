var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


// Game schema defintion
var sports = [
  'soccer', 'basketball', 'football',
  'baseball', 'volleyball', 'hockey',
  'tennis', 'paintball'
];
var GameSchema = new Schema({
  sport: { type: String, required: true, enum: sports },
  geo: { type: [Number], index: '2d' },
  players:[ {user: { type: ObjectId, ref: 'User' }, joined_on: Date } ],
  max_layers: { type: Number, required: true, min: 2, max: 40 },
  game_date: { type: Number, required: true },
  description: { type: String, max: 140, trim: true },
  created_by: { type: ObjectId, ref: 'User' },
  created_on: { type: Date, default: Date.now },
  comments: [ { type: ObjectId, ref: 'Comment' } ]
});


module.exports = mongoose.model('Game', GameSchema);
