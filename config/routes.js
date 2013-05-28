// Load Controllers
var users = require('../app/controllers/users'),
    games = require('../app/controllers/games'),
    comments = require('../app/controllers/comments'),
    auth = require('./middleware/authenticate');

module.exports = function(app) {

  // Users
  app.post('/register', auth.key, users.register);
  app.post('/login', auth.key, users.login);
  app.get('/users', auth.key, auth.user, users.get_all);
  app.get('/users/:id', auth.key, auth.user, users.get_user);

  // Games
  app.get('/games', auth.key, auth.user, games.get_all_games);
  app.post('/games', auth.key, auth.user, games.create);
  app.get('/games/:game_id', auth.key, games.get_game);
  app.put('/games/:game_id', auth.key, auth.user, games.edit);
  app.del('/games/:game_id', auth.key, auth.user, games.delete);
  app.get('/games/user/:user_id', auth.key, auth.user, games.user);
  app.get('/games/nearby', auth.key, auth.user, games.nearby);
  app.post('/games/join', auth.key, auth.user, games.join);
  app.post('/games/leave', auth.key, auth.user, games.join);

  // Comments
  app.post('/comments/:game_id', auth.key, auth.user, comments.create_comment);
  app.del('/comments/:game_id', auth.key, auth.user, comments.delete_comment);
  app.get('/comments/:game_id', auth.key, auth.user, comments.get_comments);

};
