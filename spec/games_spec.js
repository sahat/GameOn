var request = require('request');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Game = require('../app/models/game');


describe('creating a game', function() {

  beforeEach(function() {
    console.log('=== Bootstrapping ===');
    game = {
      sport: 'Soccer',
      geo: [99,40],
      description: 'Battery park soccer game',
      created_by: '50e88ddfc22c48df2a000002',
    };

    // authorization
    api_secret = 'secret';
    call_id = '007'
    api_key = 'gameon';
    signature = crypto.createHash('md5').update(api_secret + call_id).digest("hex");

    // authentication
    uid = '50e8aafee27c60eb37000003'
    token = 'snoumh67eg8tb87g';

    querystr = '?api_key='+api_key+'&call_id='+call_id+'&signature='+signature+
      '&uid='+uid+'&token='+token;
  });

  it('should match results between returned json and user input', function(done){
    request.post('http://localhost:3000/games/create' + querystr, {form: game}, function(error, response, body) {
      created_game = body;
      console.log('error response:', error);
      console.log('body response:', body);
      done();
    });
  });

  waits(1000);

  it('should delete a game', function(done) {
    request.del('http://localhost:3000/games/50e8c4daf55d399452000003' + querystr, function(error, response, body) {
      console.log('error response: ',error);
      console.log('body response: ',body);
      done();
    });



  });

  // user count
});

