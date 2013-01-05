var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


// Game schema defintion
var GameSchema = new Schema({
  sport: String,
  geo: { type: [Number], index: '2d' },
  players:[{ type: ObjectId, ref: 'User' }],
  description: String,
  created_by: { type: ObjectId, ref: 'User' },
  created_on: { type: Date, default: Date.now },
  comments: [{ user: { type: ObjectId, ref: 'User' }, body: String, date: Date }]
});


module.exports = mongoose.model('Game', GameSchema);
