
/*
 * POST /games/create
 */
var Game = require('../models/games');

exports.create_game = function(req, res) {

  var game = new Game({
    creator_id: req.body.creator_id
    //isport: req.body.sport,
    //longitude: req.body.longitude,
    //latitude: req.body.latitude,
    //players: req.body.players,
    //description: req.body.description,
    //timestamp: req.body.timestamp,
    //comments: []
  });

  game.save(function (err) {
    if (!err) {
      res.send(game);
    } else {
      res.send(err);
    }
  });
}
