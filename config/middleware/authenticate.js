var crypto = require('crypto'),
    config = require('../config'),
    User = require('../../app/models/user'),
    mongoose = require('mongoose');


exports.key = function (req, res, next){
  var api_key = req.query.api_key;
  var api_secret = config.gameon.API_SECRET;
  var call_id = req.query.call_id;
  var signature = req.query.signature;

  if (! (call_id && signature && api_key)) {
    res.json(403, { error: 'You are not authorized to make requests to this server.' });
  }

  var valid_signature = crypto.createHmac('md5', api_secret)
    .update(config.gameon.API_KEY + call_id + api_secret)
    .digest("hex");

  if (api_key === config.gameon.API_KEY && signature === valid_signature) {
    next();
  } else {
    res.json(403, { error: 'You are not authorized to make requests to this server.' });
  }
};


exports.user = function(req, res, next){
  var uid = req.body.uid || req.query.uid;
  var token = req.body.token || req.query.token;
  User.findById(mongoose.Types.ObjectId(uid), function (err, user) {
    if (!err && user && user.token === token) {
      res.user = user;
      next();
    } else {
      res.json(401, { error: 'Authentication failed' });
    }
  });
};
