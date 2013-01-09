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
  var game_id = mongoose.Types.ObjectId(req.params.game_id);
  var user_id = mongoose.Types.ObjectId(req.params.user_id);

  Game.findByIdAndUpdate(game_id, { $push: { players: user_id } }, function(err, game) {
    if (err) {
      res.send({'status': 500, 'msg': 'Internal server error has occurred' });
    } else if (game) {
      game
      .populate('players')
      .populate('comments')
      .populate('comments.user')
      .exec(function(err, updated_game) {
        res.send(updated_game);
      });
    } else {
      res.send({'status': 403, 'msg': 'The game you are trying to join no longer appears to exist'});
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
  Game.findOne({ '_id': req.body.game_id }, function(error, game) {
    if (!game) {
      res.send({ 'status': 404, 'msg': 'Game you are trying to delete is not found.' });
    } else {
      game.remove(function (error) {
        res.send(error || { 'msg': "Game successfully removed", 'game': game });
      });
    }
  });
};
