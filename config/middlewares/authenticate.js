var crypto = require('crypto');
var config = require('../config');
var User = require('../../app/models/user');
var mongoose = require('mongoose);

exports.key = function (req, res, next){
  var api_key = req.query.api_key;
  var call_id = req.query.call_id;
  var signature = req.query.signature;

  var sig = crypto.createHash('md5').update(config.gameon.API_SECRET + call_id).digest("hex");

  if (api_key === config.gameon.API_KEY && sig === signature) {
    next();
  } else {
    res.send(403, { error: 'You are not authorized to make requests from this server.' });
  }
};


exports.user = function(req, res, next){
  var uid = req.body.uid || req.query.uid;
  var token = req.body.token || req.query.token;

  User.findById(mongoose.types.ObjectId(uid), function (err, user) {
    if (!err && user) {
      next();
    } else {
      res.send(401, {error: 'Authentication required'});
    }
  });
};
