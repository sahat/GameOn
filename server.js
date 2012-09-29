var express = require('express');
var mongoose = require('mongoose');
//var games = require('./controllers/games');
var users = require('./controllers/users');
var db = mongoose.createConnection('localhost', 'test');
var User = require('./models/users');

var app = express();

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "qwerty"}));
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(3000);
/*
app.post('/games/create', games.createGame);
app.post('/games/join', function (req, res) {
  // TODO: Not implemented
});
app.get('/games/user/:user_id', function (req, res) {
  // TODO: Not implemented
});
app.get('/games/nearby/:latitude/:longitude', function (req, res) {
  temp = [];
  nearby_games = Game.find().all(function (game) {
    temp.push(game);
    return res.send(temp_push);
  });
});
app.delete('/games/:game_id', function (req, res) {
  return Game.findById(req.params.game_id, function (err, game) {
    return game.remove(function (err) {
      if (!err) {
        console.log("Game has been removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});
app.get('/games/:game_id', function (req, res){
  return Game.findById(req.params.game_id, function(err, game) {
    if (!err) return res.send(game);
    else return res.send(err);
  });
});
app.get('/games', function (req, res) {
  return Game.find(function (err, games) {
    if (!err) {
      return res.send(games);
    } else {
      return res.send(err);
    }
  });
});
*/


/*
 * Comments API
 */
app.post('/comment', function (req, res) {
  // TODO: Not implemented
});
app.delete('/comment/:game_id', function (req, res) {
  // TODO: Not implemented
});

app.get('/comment/:game_id', function (req, res) {
  // TODO: Not implemented
});

/*
 * Users API
 */

app.post('/users/create', users.createUser);
app.get('/users', function (req, res) {
  return User.find(function (err, users) {
    if (!err) {
      console.log('no error');
      return res.send(users);
    } else {
      console.log('Error occured');
      return res.send(err);
    }
  });
});

/*
   app.put('/api/products/:id', function (req, res){
   return ProductModel.findById(req.params.id, function (err, product) {
   product.title = req.body.title;
   product.description = req.body.description;
   product.style = req.body.style;
   return product.save(function (err) {
   if (!err) {
   console.log("updated");
   } else {
   console.log(err);
   }
   return res.send(product);
   });
   });
   });
   app.post('/api/products', function (req, res){
   var product;
   console.log("POST: ");
   console.log(req.body);
   product = new ProductModel({
   title: req.body.title,
   description: req.body.description,
   style: req.body.style,
   });
   product.save(function (err) {
   if (!err) {
   return console.log("created");
   } else {
   return console.log(err);
   }
   });
   return res.send(product);
   });

   app.get('/', function(req,res){

   res.render('index.jade', {
   locals : {
   title : 'Your Page Title'
   ,description: 'Your Page Description'
   ,author: 'Your Name'
   ,analyticssiteid: 'XXXXXXX'
   }
   });
   });


//A Route for Creating a 500 Error (Useful to keep around)
app.get('/500', function(req, res){
throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('/*', function(req, res){
throw new NotFound;
});

function NotFound(msg){
this.name = 'NotFound';
Error.call(this, msg);
Error.captureStackTrace(this, arguments.callee);
}
*/
console.log('Listening on http://0.0.0.0:' + 3000 );
