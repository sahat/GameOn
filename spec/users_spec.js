var assert=require('assert');
var expect = require('expect.js');
var request = require('request');
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../app/models/user');
var base_url = 'http://localhost:3000';

mongoose.connect(require('../config/config').db);

describe('user registration process', function() {

  var url = base_url + '/register';
  var user;
  beforeEach(function(done) {
    user = {
      name: 'Sahat Yalkabov',
      email: 'test' + parseInt(Math.random() * 1000) + '@gmail.com',
      password: 'badpassword',
      avatar: 'http://placekitten.com/64/64',
      bio: 'Lives in New Jersey. Web Dev.',
    };
    User.remove({email: user.email}, done);
  });
  after(function(done) {
    User.remove({email: user.email}, done);
  });

  it('should return json user object on registration success', function(done){
    request.post(url + '?hack=true', { json: user }, function(err, res, body) {
      assert.equal(res.statusCode, 200);
      assert.ok(body.token);
      done();
    });
  });

  it('should fail if the email is invalid', function(done) {
    user.email = 'invalid email';
    request.post(url + '?hack=true', { json: user }, function(err, res, body) {
      assert.equal(res.statusCode, 400);
      done();
    });
  });

  it('should fail if a user with this email already exists', function(done) {
    var existing = new User(user);
    existing.save(function(err) {
      if (err) { 
        assert.fail(err, undefined, 'Failed to write to database', '');
      }
      request.post(url + '?hack=true', { json: user }, function(err, res, body) {
        assert.equal(res.statusCode, 400);
        done();
      });
    });
  });

});


describe('login process', function() {

  var url = base_url + '/login';

  describe('with bad credentials', function() {

    var credentials;
    beforeEach(function() {
      credentials = {
        email: 'meh',
        password: 'password'
      };
    });

    it('should return a 403 if no API key is passed', function(done) {
      request.post(url, credentials, function(err, res, body) {
        assert.equal(res.statusCode, 403);
        done();
      });
    });

    it('should return a 401 if authentication fails', function(done) {
      request.post(url + '?hack=true', credentials, function(err, res, body) {
        assert.equal(res.statusCode, 401);
        done();
      });
    });

  });


  describe('with good credentials', function() {

    // Setting up hooks
    var credentials, fake_user;
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
    after(function(done) {
      fake_user.remove(done);
    });

    it('should return a 403 to an unauthorized client', function(done) {
      request.post(url, {json: credentials}, function(err, res, body) {
        assert.equal(res.statusCode, 403);
        assert.equal(undefined, body.token)
        done();
      });
    });

    it('should return a 200', function(done) {
      request.post(url + '?hack=true', {json: credentials}, function(err, res, body) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should return the correct user', function(done) {
      request.post(url + '?hack=true', {json: credentials}, function(err, res, body) {
        assert.equal(body._id, fake_user.id);
        assert.equal(body.email, fake_user.email);
        assert.ok(body.token);
        done();
      });
    });

  });

});
