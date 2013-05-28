module.exports = function() {
  var Factory = require('factory-lady')
  , User = require('../app/models/user')
  , Game = require('../app/models/game')
  , Faker = require('Faker');

  var emailCounter = 1;
  Factory.define('user', User, {
    name: Faker.Name.findName(),
    email : function(cb) { cb('user' + emailCounter++ + '@example.com'); },
    password: 'badpassword',
    avatar: '',
    bio: Faker.Lorem.sentence()
  });

  var sports = [ 
    'soccer', 'basketball', 'football', 'baseball', 'volleyball',
    'hockey', 'tennis', 'paintball'
  ];
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

};
