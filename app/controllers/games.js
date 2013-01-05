// Load Models
var mongoose = require('mongoose');
var Game = require('../models/game');
var User = require('../models/user');


// Get a specific game
exports.get_game = function (req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    res.send(err || game);
  });
};


// Get all games
exports.get_all = function(req, res) {
  Game.find(function (err, games) {
    res.send(err || games);
  });
};


// Get games near a latitude and longitude
exports.nearby = function(req, res) {
  Game.find(
    { geo: { $nearSphere: [req.query.longitude, req.query.latitude] } },
    function (err, games) {
      res.send(err || games);
    }
  );
};


// Get all games that this user has joined
exports.user = function(req, res) {
  Game
  .find()
  .where( mongoose.Types.ObjectId(req.params.user_id) ).in('players')
  .populate('players')
  .exec(function (err, games) {
    res.send(err || games);
  });
};


// Have a user join a game
exports.join = function(req, res) {
  var game_id = mongoose.Types.ObjectId(req.params.game_id);
  var user_id = mongoose.Types.ObjectId(req.params.user_id);

  Game.findByIdAndUpdate(game_id, { $push: { players: user_id } }, function(err, game) {
    if (err) {
      res.send(500, {error: 'Internal server error has occurred'});
    } else if (game) {
      game
      .populate('players')
      .populate('comments')
      .populate('comments.user')
      .exec(function(err, updated_game) {
        res.send(updated_game);
      });
    } else {
      res.send(403, {error: 'The game you are trying to join no longer appears to exist'});
    }
  });
};

// Have a user leave a game
exports.leave = function(req, res) {
};


// Create a new game
exports.create = function(req, res) {
  var game = new Game({
    created_by: "Sahat",
    sport: req.body.sport,
    geo: [req.body.latitude, req.body.longitude],
    description: req.body.description
  });

  game.players.push('Sahat');

  game.save(function (err) {
    res.send(err || game);
  });
};


// Edit a game
exports.edit = function(req, res) {
};


// Delete a game
exports.delete = function(req, res) {
  Game.findById(req.params.game_id, function (err, game) {
    game.remove(function (err) {
      res.send(err || {message: "Game successfully removed"});
    });
  });
};
