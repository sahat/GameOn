var User = require('../models/users');

/* POST user/create */
exports.createUser = function(req, res) {
  var user = new User({
    name: req.body.name
  });
  user.save(function (err) {
    if (!err) {
      res.send(user);
      console.log("Saved user to DB");
    } else {
      res.send(err);
    }
  });
}

/* GET user/:user_id */
exports.findAllUsers = function(req, res) {
  console.log("I am in find all users...");
  var all_users = "kitten";
  all_users =

  console.log(all_users);
}

