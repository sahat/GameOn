var mongoose = require('mongoose');
var request = require('./helpers/auth');
var should = require('should');
var User = require('../app/models/user');
var Faker = require('Faker');


describe('Users Controller', function() {
  var base_url = 'http://localhost:3000';

  before(function(){
    mongoose.connect(require('../config/config').db);
  });

  after(function(done) {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close(done);
  });


  describe('user registration process', function() {

    var url = base_url + '/register';
    var user, options;
    beforeEach(function(done) {
      user = {
        name: 'Sahat Yalkabov',
        email: 'test' + parseInt(Math.random() * 1000) + '@gmail.com',
        password: 'badpassword',
        avatar: 'http://placekitten.com/64/64',
        bio: 'Lives in New Jersey. Web Dev.',
      };
      options = {
        url: url,
        json: user
      }
      User.remove({email: user.email}, done);
    });
    after(function(done) {
      User.remove({email: user.email}, done);
    });

    it('should return json user object on registration success', function(done){
      request.post(options, function(err, res, body) {
        res.should.have.status(200);
        body.token.should.be.ok;
        body.email.should.be.ok;
        done();
      });
    });

    it('should fail if the email is invalid', function(done) {
      options.json.email = 'invalid email';
      request.post(options, function(err, res, body) {
        res.should.have.status(400);
        should.not.exist(body.token);
        done();
      });
    });

    it('should fail if a user with this email already exists', function(done) {
      var existing = new User(user);
      existing.save(function(err) {
        should.not.exist(err);
        request.post(options, function(err, res, body) {
          res.should.have.status(400);
          done();
        });
      });
    });

  });


  describe('login process', function() {

    var url = base_url + '/login';

    describe('with bad credentials', function() {

      var credentials, options;
      beforeEach(function() {
        credentials = {
          email: 'meh',
          password: 'password'
        };
        options = {
          url: url,
          json: credentials
        };
      });

      it('should return a 403 if no API key is passed', function(done) {
        options.invalid_signature = true;
        request.post(options, function(err, res, body) {
          res.should.have.status(403);
          done();
        });
      });

      it('should return a 401 if authentication fails', function(done) {
        request.post(options, function(err, res, body) {
          res.should.have.status(401);
          done();
        });
      });

    });


    describe('with good credentials', function() {

      var credentials, fake_user, options;
      before(function(done) {
        credentials = {
          email: 'user' + parseInt(Math.random() * 1000, 10) + '@integlabs.com',
          password: 'password'
        }
        fake_user = new User({
          name: 'Test User',
          email: credentials.email,
          password: credentials.password,
          bio: 'test bio'
        });
        fake_user.save(done);
      });
      beforeEach(function() {
        options = {
          url: url,
          json: credentials
        };
      });
      after(function(done) {
        fake_user.remove(done);
      });

      it('should return a 403 to an unauthorized client', function(done) {
        options.invalid_signature = true;
        request.post(options, function(err, res, body) {
          res.should.have.status(403);
          should.not.exist(body.token);
          should.exist(body.error);
          done();
        });
      });

      it('should return the correct user', function(done) {
        request.post(options, function(err, res, body) {
          res.should.have.status(200);
          fake_user.id.should.equal(body._id);
          fake_user.email.should.equal(body.email);
          should.exist(body.token);
          done();
        });
      });

    });
  });
});

