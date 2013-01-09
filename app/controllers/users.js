var mongoose = require('mongoose');
var User = require('../models/user');

// Get a specific User
exports.get_user = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.send(500, err);
    } else if (user) {
      res.send(user);
    } else {
      res.send(404, user);
    }
  });
};


// Get all users
exports.get_all = function (req, res) {
  User
  .find()
  .exclude('password')
  .exec(function(err, users) {
    if (err) {
      res.send(500, err)
    } else if (users) {
      res.send(users);
    } else {
      res.send(404, users);
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
      res.send(500, err);
    } else {
      console.log("Saved user to the database successfully");
      user = user.toObject();
      delete user.password;
      res.send(user);
    }
  });
};


// Login a user and retrieve his data
exports.login = function (req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      res.send(500, err);
    } else if (user) {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch) {
          user = user.toObject();
          delete user.password;
          res.send(user);
        } else {
          res.send(401, { message: 'Incorrect password' });
        }
      });
    } else {
      res.send(404, { message: 'User not found' });
    }


  });
};
