var mongoose = require('mongoose');
var User = mongoose.model('User');

// Get a specific User
exports.get_user = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(user);
  });
};


// Get all users
exports.get_all = function (req, res) {
  User.find()
  .exclude('password')
  .exec(function (err, users) {
    if (!err) {
      res.send(users.toObject());
    } else {
      res.send(err);
    }
  });
};


// Register a user
exports.register = function (req, res) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    bio: req.body.bio
  });

  user.save(function (err) {
    if (!err) {
      console.log("Saved user to the database successfully");
      user = user.toObject();
      delete user.password;
      res.send(user);
    } else {
      res.send(err);
    }
  });
};


// Login a user and retrieve his data
exports.login = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        res.send({ error: 'Invalid Password' });
      } else {
        user = user.toObject();
        delete user.password;
        res.send(user);
      }
    });
  });
};
