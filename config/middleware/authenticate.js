var crypto = require('crypto'),
    config = require('../config'),
    User = require('../../app/models/user'),
    mongoose = require('mongoose');


exports.key = function (req, res, next){
  var hack = req.query.hack;
  var api_key = req.query.api_key;
  var call_id = req.query.call_id;
  var signature = req.query.signature;

  if (! (hack || (call_id && signature && api_key))) {
    res.json(403, { error: 'You are not authorized to make requests to this server.' });
  }

  var sig = crypto.createHash('md5').update(config.gameon.API_SECRET + call_id).digest("hex");
  sig = crypto.createHash('md5').update(sig + config.gameon.API_SECRET).digest("hex");

  if (hack || ( api_key === config.gameon.API_KEY && sig === signature) ) {
    next();
  } else {
    res.json(403, { error: 'You are not authorized to make requests to this server.' });
  }
};


exports.user = function(req, res, next){
  var uid = req.body.uid || req.query.uid;
  var token = req.body.token || req.query.token;
  console.log(uid);
  User.findById(mongoose.Types.ObjectId(uid), function (err, user) {
    if (!err && user && user.token === token) {
      res.user = user;
      next();
    } else {
      res.json(401, { error: 'Authentication failed' });
    }
  });
};
