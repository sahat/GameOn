var assert=require('assert');
var expect = require('expect.js');
var request = require('request');
var crypto = require('crypto');
var mongoose = require('mongoose');

var User = require('../app/models/user');

describe('user registration process', function() {
  // authorization
  api_secret = 'secret';
  call_id = '007';
  api_key = 'gameon';
  signature = crypto.createHash('md5').update(api_secret + call_id).digest("hex");

  // combined querystring
  querystr = '?api_key='+api_key+'&call_id='+call_id+'&signature='+signature;

  // dummy user object
  user = {
    name: 'Sahat Yalkabov',
    email: 'sakhat@gmail.com'+Math.floor(Math.random()*1000),
    password: 'ASDF1!@#$',
    avatar: 'http://avatar.com/avatar.png',
    bio: 'Lives in New Jersey. Web Dev.',
    token: 'snoumh67eg8tb87g' // should be randomly generated in controller
  };

  it('should return json user object on registration success', function(done){
    request.post('http://localhost:3000/register' + querystr, { form: user }, function(error, response, body) {
      expect(body).toEqual(jasmine.any(Object));
      done();
    });
  });

});


describe('login process', function() {

  var credentials = {
    email: 'bilalquadri92@gmail.com',
    password: 'password'
  };

  it('should return a 403 if no API key is passed', function(done) {
    request.post('http://localhost:3000/login', credentials, function(err, res, body) {
      assert.equal(res.statusCode, 403);
      done();
    });
  });

  it('should return a 401 if authentication fails', function(done) {
    request.post('http://localhost:3000/login?hack=true', {email:'meh', password:'meh'}, function(err, res, body) {
      assert.equal(res.statusCode, 401);
      done();
    });
  });

});
