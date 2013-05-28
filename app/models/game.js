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
  max_players: { type: Number, required: true, min: 2, max: 40 },
  game_date: { type: Date, required: true },
  description: { type: String, max: 140, trim: true, default: '' },
  created_by: { type: ObjectId, ref: 'User' },
  created_on: { type: Date, default: Date.now },
  players: [
    {
      user: { type: ObjectId, ref: 'User' },
      user_name: { type: String, required: true, trim: true },
      user_avatar: { type: String, default: '', trim: true },
      joined_on: Date
    }
  ],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    user_name: { type: String, required: true, trim: true },
    user_avatar: { type: String, default: '', trim: true },
    text: { type: String, required: true, max: 255 },
    date: { type: Date, default: Date.now }
  }]
});


module.exports = mongoose.model('Game', GameSchema);
