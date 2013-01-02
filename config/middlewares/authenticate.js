
// data = req.body;
// routes uses authenticate.key without any parameters
// I would pass req.body like so authenticate.key(data),
// but routes only accepts 2 params: routes only function(app, authenticate) {

exports.key = function (data){
  var api_key = data.api_key;
  var call_id = data.call_id;
  var signature = data.signature;

  var sig = crypto.createHash('md5').update(API_SECRET + call_id).digest("hex");
  //console.log('My signature:', sig, API_KEY);
  //console.log('Bilal', api_key, call_id, signature);
  //console.log('====');
  return (api_key === API_KEY && sig === signature);
};

// req, res, cb
// again authenticate.user doesn't take any parameters
exports.user = function(){
  var uid = req.body.uid || req.query.uid;
  var token = req.body.token || req.query.token;

  User.findOne({ 'email': uid }, function (err, user) {
    if (!err && user) {
      cb(user._id.toString() === token);
    } else {
      res.send({error: 'User not found'});
    }
  });
};

