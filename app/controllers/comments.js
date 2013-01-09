var mongoose = require('mongoose');
var User = mongoose.model('User');


// Create a new comment
exports.create_comment = function(req, res) {
  var comment = new Comment({
    user: req.body.user_id,
    body: req.body.text
  });

  comment.save(function(err) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(game);
    }
  });
};


// Delete a comment from a particular game
exports.delete_comment = function(req, res) {
  Comment.remove({ '_id': req.params.comment_id }, function(err) {
    if (err) {
      res.send(500, err);
    } else {
      res.send({ message: "The game has been deleted" });
    }
  });
};


// Get comments for a particular game
exports.get_comments = function(req, res) {
  Comment.findById(req.params.comment_id, function(err, game) {
    if (err) {
      res.send(500, err);
    } else if (game) {
      res.send(game)
    } else {
      res.send(404, { message: 'Game not found' });
    }
  });
};