var mongoose = require('mongoose');
var User = require('../models/user');


// Get a specific User
exports.get_user = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json(500, err);
    } else if (user) {
      res.json(user);
    } else {
      res.json(404, user);
    }
  });
};


// Get all users
exports.get_all = function(req, res) {
  User
  .find()
  .exclude('password')
  .exec(function(err, users) {
    if (err) {
      res.json(500, err)
    } else {
      res.json(users);
    }
  });
};


// Register a user
exports.register = function(req, res) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    bio: req.body.bio,
    token: req.body.token
  });

  user.save(function(err) {
    if (err) {
      res.json(400, err);
    } else {
      user = user.toObject();
      delete user.password;
      res.json(user);
    }
  });
};


// Login a user and retrieve their data
exports.login = function (req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      res.json(500, err);
    } else if (user) {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch) {
          user = user.toObject();
          delete user.password;
          res.json(user);
        } else {
          res.json(401, { error: 'Incorrect password' });
        }
      });
    } else {
      res.json(401, { error: 'User not found' });
    }
  });
};
