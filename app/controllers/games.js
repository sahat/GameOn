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
  var game_id = mongoose.Types.ObjectId(req.body.game_id)
  var user_id = mongoose.Types.ObjectId(req.body.user_id);

  Game.findByIdAndUpdate(game_id, { $push: { 'players': user_id } }, function(error, game) {
    if (error) {
      res.send({ code: 500, message: error });
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
    created_by: req.body.created_by,
    sport: req.body.sport,
    geo: req.body.geo,
    description: req.body.description,
  });

  game.players.push({
    user: mongoose.Types.ObjectId('50e8aafee27c60eb37000003'),
    joined_on: new Date()
  });

  game.save(function (err) {
    console.log('200: Game Created');
    res.send(err || game);
  });
};


// Edit a game
exports.edit = function(req, res) {
};


// Delete a game
exports.delete = function(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    game.remove(function(err) {
      res.send(err || {message: "200: Game successfully removed"});
    });
  });
};
