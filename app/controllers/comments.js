var mongoose = require('mongoose');
var User = mongoose.model('User');


// Create a new comment
exports.create_comment = function(req, res) {
  var comment = {
    user: req.body.user_id,
    text: req.body.text
  };
  Game.update({ _id: req.params.game_id }, { $push: { comments: comment } }, function (err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json({ message: 'New comment has been created' });
    }
  });
};


// Delete a comment from a particular game
exports.delete_comment = function(req, res) {
  Game.update({ '_id': req.params.game_id }, { $pull: { comments: req.body.comment_id } }, function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json({ message: "The comment has been deleted" });
    }
  });
};


// Get comments for a particular game
exports.get_comments = function(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (err) {
      res.json(500, err);
    } else if (game) {
      res.json(game.comments)
    } else {
      res.json(404, { error: 'The game was not found' });
    }
  });
};
