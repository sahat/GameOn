var crypto = require('crypto')
  , config = require('../../config/config').gameon
  , request = require('request')
  , mongoose = require('mongoose');

module.exports = function(options, callback) {

  var call_id, sig, query_string;

  call_id = Date.now().toString();

  sig = crypto.createHmac('md5', config.API_SECRET)
    .update(config.API_KEY + call_id + config.API_SECRET)
    .digest("hex");

  query_string = options.qs || {};
  if (! options.invalid_signature) {
    query_string.api_key = config.API_KEY;
    query_string.call_id = call_id;
    query_string.signature = sig;
  }
  if (query_string.token || options.token) {
    query_string.token = query_string.token || options.token;
  }

  var params = {
    uri: options.url
  , method: options.method
  , qs: query_string
  , json: options.json || options.body
  ,
  };

  request(params, (callback || options.callback));
};
