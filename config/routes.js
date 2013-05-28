// Load Controllers
var users = require('../app/controllers/users'),
    games = require('../app/controllers/games'),
    comments = require('../app/controllers/comments'),
    auth = require('./middleware/authenticate'),
    validate_client = auth.key,
    require_authentication = auth.user;

module.exports = function(app) {

  /* All requests must come from a valid client */
  app.all('*', validate_client);

  // User registration & login
  app.post('/register', users.register);
  app.post('/login', users.login);

  /* All other requests require authentication */
  app.all('*', require_authentication);

  // Users
  app.get('/users', users.get_all);
  app.get('/users/:id', users.get_user);

  // Games
  app.get('/games', games.get_all_games);
  app.post('/games', games.create);
  app.get('/games/:game_id', games.get_game);
  app.put('/games/:game_id', games.edit);
  app.del('/games/:game_id', games.delete);
  app.get('/games/user/:user_id', games.user);
  app.get('/games/nearby', games.nearby);
  app.post('/games/join', games.join);
  app.post('/games/leave', games.join);

  // Comments
  app.post('/comments/:game_id', comments.create_comment);
  app.del('/comments/:game_id', comments.delete_comment);
  app.get('/comments/:game_id', comments.get_comments);

};
