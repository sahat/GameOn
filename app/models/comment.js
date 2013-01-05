var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// Comment schema definition
var CommentSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  body: String,
  date: Date
});


module.exports = mongoose.model('Comment', CommentSchema);
