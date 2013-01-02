var Game = require('./models/game');
var User = require('./models/user');

exports.get = function (req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    res.send(err || game);
  });
};

exports.get_all = function(req, res) {
  Game.find(function (err, games) {
    res.send(err || games);
  });
};

exports.nearby = function (req, res) {
  Game.find(
    { geo: { $nearSphere: [req.params.longitude, req.params.latitude] } },
    function (err, games) {
      res.send(err || games);
    }
  );
};

exports.user = function (req, res) {
};

exports.join = function (req, res) {
};

exports.create = function (req, res) {
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

exports.edit = function (req, res) {
};

exports.delete = function (req, res) {
  Game.findById(req.params.game_id, function (err, game) {
    game.remove(function (err) {
      res.send(err || {message: "Game successfully removed"});
    });
  });
};
