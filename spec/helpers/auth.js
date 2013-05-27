var crypto = require('crypto')
  , config = require('../../config/config')
  , request = require('request')
  , mongoose = require('mongoose');

module.exports = function(options) {

  var call_id = Date.now().toString();
  var sig = crypto.createHash('md5')
    .update(config.gameon.API_SECRET + call_id)
    .digest("hex");

  sig = crypto.createHash('md5')
    .update(sig + config.gameon.API_SECRET)
    .digest("hex");

  var query_string = {
    api_key: config.API_KEY
  , call_id: call_id
  , signature: sig
  };

  request({
      uri: options.url,
    , method: options.method
    , qs: query_string
    , json: options.body
    ,
    }
    , options.callback
  );

};
