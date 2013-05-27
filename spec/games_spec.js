var request = require('request');
var crypto = require('crypto');
var mongoose = require('mongoose');
var assert = require('assert');
var expect = require('expect.js');

var Game = require('../app/models/game');

//describe('Games controller', function() {
  //// authorization
  //api_secret = 'secret';
  //call_id = '007'
  //api_key = 'gameon';
  //signature = crypto.createHash('md5').update(api_secret + call_id).digest("hex");

  //// authentication
  //uid = '50e8aafee27c60eb37000003'
  //token = 'snoumh67eg8tb87g';

  //// combined querystring
  //querystr = '?api_key='+api_key+'&call_id='+call_id+'&signature='+signature+'&uid='+uid+'&token='+token;


  //it('should create a new game', function(done){

    //var game = {
      //sport: 'Soccer',
      //geo: [99,40],
      //description: 'Battery park soccer game',
      //created_by: '50e88ddfc22c48df2a000002',
    //};

    //request.post('http://localhost:3000/games/create' + querystr, { form: game }, function(error, response, body) {
      //var result = JSON.parse(body);
      //expect(result.sport).toBeDefined();
      //expect(result.sport).toEqual(game.sport);
      //expect(result.geo).toEqual(game.geo);
      //expect(result.description).toEqual(game.description);
      //expect(result.created_by).toEqual(game.created_by);
      //expect(result.players.length).toBe(1);
      //done();
    //});

  //});


  //it('should delete a game', function(done) {

    //// dummy game object id

    //request.del('http://localhost:3000/games/50e8c4daf55d399452000003' + querystr, function(error, response, body) {
      //console.log('error response: ',error);
      //console.log('body response: ',body);
      //done();
    //});



  //});
//});

