var assert=require('assert');
var expect = require('expect.js');
var request = require('request');
var crypto = require('crypto');
var mongoose = require('mongoose');

var User = require('../app/models/user');
var base_url;

mongoose.connect(require('../config/config').db);

//describe('user registration process', function() {
  //// authorization
  //api_secret = 'secret';
  //call_id = '007';
  //api_key = 'gameon';
  //signature = crypto.createHash('md5').update(api_secret + call_id).digest("hex");

  //// combined querystring
  //querystr = '?api_key='+api_key+'&call_id='+call_id+'&signature='+signature;

  //// dummy user object
  //user = {
    //name: 'Sahat Yalkabov',
    //email: 'sakhat@gmail.com'+Math.floor(Math.random()*1000),
    //password: 'ASDF1!@#$',
    //avatar: 'http://avatar.com/avatar.png',
    //bio: 'Lives in New Jersey. Web Dev.',
    //token: 'snoumh67eg8tb87g' // should be randomly generated in controller
  //};

  //it('should return json user object on registration success', function(done){
    //request.post('http://localhost:3000/register' + querystr, { form: user }, function(error, response, body) {
      //expect(body).toEqual(jasmine.any(Object));
      //done();
    //});
  //});

//});


describe('login process', function() {
  base_url = 'http://localhost:3000/login';

  describe('with bad credentials', function() {

    var credentials;
    beforeEach(function() {
      credentials = {
        email: 'meh',
        password: 'password'
      };
    });

    it('should return a 403 if no API key is passed', function(done) {
      request.post(base_url, credentials, function(err, res, body) {
        assert.equal(res.statusCode, 403);
        done();
      });
    });

    it('should return a 401 if authentication fails', function(done) {
      request.post(base_url + '?hack=true', credentials, function(err, res, body) {
        assert.equal(res.statusCode, 401);
        done();
      });
    });

  });


  describe('with good credentials', function() {

    // Set up
    var url;
    before(function(done) {
      url = 'http://localhost:3000/login?hack=true';
      credentials = {
        email: 'user' + (Math.random() * 1000) + '@integlabs.com',
        password: 'password'
      }
      fake_user = new User({
        name: 'Test User',
        email: credentials.email,
        password: credentials.password,
        token: Math.random().toString(36).substring(3),
        bio: 'test bio'
      });
      fake_user.save(done);
    });
    after(function(done) {
      fake_user.remove(done);
    });

    it('should return a 200 on success', function(done) {
      request.post(url, credentials, function(err, res, body) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    //it('should return the correct user', function(done) {
      //request.post(url, credentials, function(err, res, body) {
        //console.log(body);
        //assert.equal('TODO', 'TODO');
        //done();
      //});
    //});

  });

});
