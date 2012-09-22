var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  message: String,
  timestamp: Date,
  user_id: mongoose.Schema.Types.ObjectId
});

var Comment = db.model('Comment', CommentSchema);

module.exports = Comment;
