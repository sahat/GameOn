var should = require('should')
  , request = require('./helpers/auth')
  , mongoose = require('mongoose')
  , async = require('async')
  , Factory = require('factory-lady')
  , Faker = require('Faker')
  , User = require('../app/models/user')
  , Game = require('../app/models/game');

var sports = [
  'soccer', 'basketball', 'football',
  'baseball', 'volleyball', 'hockey',
  'tennis', 'paintball'
];

var emailCounter = 1;
Factory.define('user', User, {
  name: Faker.Name.findName(),
  email : function(cb) { cb('user' + emailCounter++ + '@example.com'); },
  password: 'badpassword',
  avatar: '',
  bio: Faker.Lorem.sentence()
});

Factory.define('game', Game, {
  sport: Faker.random.array_element(sports),
  geo: [Faker.random.number(100), Faker.random.number(100)],
  max_players: 4 + Faker.random.number(8),
  game_date: new Date(new Date() + (24000 * 3600)),
  created_by: Factory.assoc('user'),
  players: [{
    user: Factory.assoc('user'),
    user_name: Factory.assoc('user', 'name'),
    user_avatar: Factory.assoc('user', 'avatar')
  }],
  comments: []
});


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

    it('should return 403 if there is no signature', function(done) {
      options.invalid_signature = true;
      request.get(options, function(err, res, body) {
        res.should.have.status(403);
        done();
      });
    });

    it('should return 401 when user is not signed in', function(done) {
      request.post(options, function(err, res, body) {
        res.should.have.status(401);
        done();
      });
    });

    describe('when user is logged in', function() {
      var users;
      beforeEach(function(done) {
        users = [];
        async.series([
          function(cb) { Factory('user', function(user) { users.push(user); cb(); }) },
          function(cb) { Factory('user', function(user) { users.push(user); cb(); }) },
          function(cb) { Factory('user', function(user) { users.push(user); cb(); }) },
        ],
        function(err) {
          options.token = users[0].token;
          options.uid = users[0]._id.toString();
          done(err);
        });
      });
      afterEach(function(done) {
        async.each(users, function(user, cb) { user.remove(cb)}, function(err) {
          Game.remove(done);
        });
      });

      it('should return a 406 if bad input is provided', function(done) {
        request.post(options, function(err, res, body) {
          res.should.have.status(406);
          done();
        });
      });
    });

  });

});
