var mongoose = require('mongoose');
var User = require('../models/users');

/* POST user/create */
exports.createUser = function(req, res) {
  var user = new User({
    name: req.body.name
  });
  user.save(function (err) {
    if (!err) {
      console.log("Saved user to the database successfully");
      res.send(user);
    } else {
      console.log(err);
      res.send(err);
    }
  });
}

/* GET users */
exports.findAllUsers = function(req, res) {
  mongoose.connect('localhost', 'test');
  return User.find(function (err, users) {
    if (!err) {
      console.log(users);
      return res.send(users);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
}

/* GET users/:user_id */
exports.findUserById = function(req, res) {
  return User.findById(req.params.game_id, function(err, user) {
    if (!err) {
      console.log(user);
      return res.send(user);
    }
    else {
      console.log(err);
      return res.send(err);
    }
  });
}
