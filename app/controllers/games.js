// Load Models
var mongoose = require('mongoose');
var Game = require('../models/game');
var User = require('../models/user');


// Get a specific game
exports.get_a_game = function(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (err) {
      res.send(500, err);
    } else if (game) {
      res.send(game)
    } else {
      res.send(404, { message: 'Game not found' });
    }
  });
};


// Get all games
exports.get_all_games = function(req, res) {
  Game.find(function(err, games) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(games);
    }
  });
};


// Get games near a latitude and longitude
exports.nearby = function(req, res) {
  var area = [req.query.longitude, req.query.latitude];
  Game.find({ geo: { $nearSphere: area } }, function(err, games) {
      if (err) {
        res.send(500, err);
      } else
        res.send(games);
    }
  );
};


// Get all games that this user has joined
exports.user = function(req, res) {
  Game
  .where(req.params.user_id).in('players')
  .populate('players')
  .exec(function(err, games) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(games);
    }
  });
};


// Have a user join a game
exports.join = function(req, res) {
  Game.findByIdAndUpdate(req.query.game_id, { $push: { players: req.query.user_id } }, function(err, game) {
    if (err) {
      res.send(500, err);
    } else if (game) {
      game
      .populate('players')
      .populate('comments')
      .populate('comments.user')
      .exec(function(err, updated_game) {
        res.send(updated_game);
      });
    } else {
      res.send(404, { message: 'The game you are trying to join no longer exists' });
    }
  });
};


// Have a user leave a game
exports.leave = function(req, res) {
  Game.findByIdAndUpdate(req.query.game_id, { $pull: { players: req.query.user_id } }, function(err, game) {
    if (err) {
      res.send(500, err);
    } else if (game) {
      game
        .populate('players')
        .populate('comments')
        .populate('comments.user')
        .exec(function(err, updated_game) {
          res.send(updated_game);
        });
    } else {
      res.send(404, { message: 'The game you are trying to join no longer exists' });
    }
  });
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
    if (err) {
      res.send(500, err);
    } else {
      res.send(game);
    }
  });
};


// Edit a game
exports.edit = function(req, res) {
  // s
};


// Delete a game
exports.delete = function(req, res) {
  Game.remove({ '_id': req.body.game_id }, function(err) {
    if (err) {

    } else if (game) {
      game.remove(function (error) {
        res.send({ message: "Game has been removed", 'game': game });
      });
    } else {
      res.send({ 'status': 404, 'msg': 'Game you are trying to delete is not found.' });
    }
  });
};
