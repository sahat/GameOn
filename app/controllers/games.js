// Load Models
var mongoose = require('mongoose'),
    Game = require('../models/game'),
    User = require('../models/user');


// Get a specific game
exports.get_game = function(req, res) {
  Game
  .findById(req.params.game_id)
  .exec(function(err, game) {
    if (err) {
      res.json(500, err);
    } else if (game) {
      game.comments = game.comments.slice(0,4);
      res.json(game)
    } else {
      res.json(404, { message: 'The game is not found' });
    }
  });
};


// Get all games
exports.get_all_games = function(req, res) {
  Game.find(function(err, games) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(games);
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
  .exec(function(err, games) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(games);
    }
  });
};


// Have a user join a game
exports.join = function(req, res) {
  Game.findById(req.query.game_id, function(err, game) {
    if (err) {
      res.json(500, err);
    } else if (game) {
      var updatedGame = game.toObject();
      updatedGame.players.push({
        user: req.query.user_id,
        user_name: res.user.name,
        user_avatar: res.user.avatar,
        joined_on: Date.now()
      });
      res.json(updatedGame);
    } else {
      res.json(404, { message: 'The game you are trying to join no longer exists' });
    }
  });
};


// Have a user leave a game
exports.leave = function(req, res) {
  // TODO: Move to js utilities file
  function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) {
        return i;
      }
    }
    return -1;
  }

  Game.findById(req.query.game_id, function(err, game) {
    if (err) {
      res.json(500, { message: err });
    } else if (game) {
      var indexToRemove = arrayObjectIndexOf(game.players, req.query.user_id, 'user');
      var updatedGame = game.toObject();
      updatedGame.players.splice(indexToRemove, 1);
      res.json(updatedGame);
    } else {
      res.json(404, { message: 'The game you are trying to join no longer exists' });
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
    players: []
  });

  game.players.push({
    user: mongoose.types.ObjectId(res.user._id),
    user_name: res.user.name,
    user_avatar: res.user.avatar,
    joined_on: Date.now()
  });

  game.save(function (err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(game);
    }
  });
};


// Edit a game
exports.edit = function(req, res) {
  Game.findById(req.query.game_id, function(err, game) {
    if (err) {
      res.json(500, { message: err });
    } else if (game) {
      game.game_date = req.body.game_date || game.game_date;
      game.geo = req.body.geo || game.geo;
      game.description = req.body.description || game.description;
      game.max_players = req.body.max_players || game.max_players;
      game.save(function(err) {
        if (err) {
          res.json(500, { message: err });
        } else {
          res.json({ message: 'The game has been updated' });
        }
      });
    } else {
      res.send(404, { message: 'The game you are trying to update no longer exists' });
    }
  });
};


// Delete a game
exports.delete = function(req, res) {
  Game.remove({ '_id': req.body.game_id }, function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json({ message: "The game has been deleted" });
    }
  });
};
