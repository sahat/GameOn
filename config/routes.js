// Load Controllers
var users = require('../app/controllers/users');
var games = require('../app/controllers/games');
var comments = require('../app/controllers/comments');

module.exports = function(app) {

  // Users Routes
  app.post('/signup', authenticate.key, users.register);
  app.post('/login', authenticate.key, users.login);
  app.get('/users', authenticate.key, authenticate.user, users.get_all);
  app.get('/users/:id', authenticate.key, authenticate.user, users.get_user);


  // Games Routes
  app.post('/games', authenticate.key, authenticate.user, games.create);
  app.post('/games/join', authenticate.key, authenticate.user, games.join);
  app.post('/games/leave', authenticate.key, authenticate.user, games.join);
  app.get('/games/user/:user_id', authenticate.key, authenticate.user, games.user);
  app.get('/games/nearby', authenticate.key, authenticate.user, games.nearby);
  app.get('/games/:game_id', authenticate.key, games.get);
  app.put('/games/:game_id', authenticate.key, authenticate.user, games.edit);
  app.del('/games/:game_id', authenticate.key, authenticate.user, games.delete);
  app.get('/games', authenticate.key, authenticate.user, games.get_all);


  // Comments Routes
  app.post('/comments', authenticate.key, authenticate.user, comments.create);
  app.del('/comments/:game_id', authenticate.key, authenticate.user, comments.delete);
  app.get('/comments/:game_id', authenticate.key, authenticate.user, comments.get);

};
