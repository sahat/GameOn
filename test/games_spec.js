var should = require('should');
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

    it('should get status code 403 if there is no signature', function(done) {
      options.invalid_signature = true;
      request.get(options, function(err, res, body) {
        res.should.have.status(403);
        done();
      });
    });

    it('should send status code 401 when user is not signed in', function(done) {
      request.post(options, function(err, res, body) {
        res.should.have.status(401);
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

