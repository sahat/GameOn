var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


// Game schema defintion
var GameSchema = new Schema({
  sport: String,
  geo: { type: [Number], index: '2d' },
  players:[ {user: { type: ObjectId, ref: 'User' }, joined_on: Date } ],
  description: String,
  created_by: { type: ObjectId, ref: 'User' },
  created_on: { type: Date, default: Date.now },
  comments: [ { type: ObjectId, ref: 'Comment' } ]
});


module.exports = mongoose.model('Game', GameSchema);
