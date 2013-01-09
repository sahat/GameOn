var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// Comment schema definition
var CommentSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  text: { type: String, required: true, max: 255 },
  date: { type: Date, default: Date.now() }
});


module.exports = mongoose.model('Comment', CommentSchema);
