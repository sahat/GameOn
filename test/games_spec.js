var assert = require('assert');
var request = require('./helpers/auth');
var mongoose = require('mongoose');
var User = require('../app/models/user');
var Game = require('../app/models/game');

describe('Games Controller', function() {
  var url, options;

  before(function(){
    mongoose.connect(require('../config/config').db);
  });

  beforeEach(function() {
    url = 'http://localhost:3000/games';
    options = { url: url };
  });

  after(function(done) {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close(done);
  });

  describe('creating a new game', function() {
    it('should fail when given bad input on POST', function(done) {
      options.method = 'POST';
      request(options, function(err, res, body) {
        assert.notEqual(200, res.statusCode);
        done();
      });
    });
  });

});

  //this.url = 'http://localhost:3000/games';

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

