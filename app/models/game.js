var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new mongoose.Schema({
  sport: String,
  geo: { type: [Number], index: '2d' },
  players:[User],
  description: String,
  created_by: String,
  //created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_on: { type: Date, default: Date.now },
  comments: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, body: String, date: Date }]
});

mongoose.model('Game', GameSchema);