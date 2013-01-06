var request = require('request');
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../app/models/user');


describe('user registration process', function() {

  beforeEach(function() {
    user = {
      name: 'Sahat Yalkabov',
      email: 'sakhat@gmail.com',
      password: 'ASDF1!@#$',
      avatar: 'http://avatar.com/avatar.png',
      bio: 'Lives in New Jersey. Web Dev.',
      token: 'snoumh67eg8tb87g'
    };

    api_secret = 'secret';
    call_id = '007';
    api_key = 'gameon';
    signature = crypto.createHash('md5').update(api_secret + call_id).digest("hex");
    querystr = '?api_key='+api_key+'&call_id='+call_id+'&signature='+signature;
  });

  afterEach(function() {
    foo = 011;
  });

  xit('should create a new user', function(done){
    request.post('http://localhost:3000/register' + querystr, {form: user}, function(error, response, body) {
      console.log('error:');
      console.log(error);
      console.log('body:');
      console.log(body);
      console.log('user:');
      console.log(typeof user);
      //User.find(function(users) {
      // console.log(users);
      //});
      done();
    });
  });

  // user count
});
