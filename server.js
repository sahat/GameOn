var request = require('request');
var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

////////// Schemas //////////
var GameSchema = new mongoose.Schema({
  sport: String,
  geo: { type: [Number], index: '2d' },
  players:[User],
  description: String,
  created_by: String,
  //created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_on: { type: Date, default: Date.now },
  comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, body: String, date: Date }]
});

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  avatar: String,
  bio: String,
  created_on: { type: Date, default: Date.now }
});


UserSchema.pre('save', function (next) {
  var user = this;

  // hash password only if modified or new
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password with a new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override text password with the hashed password
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
       cb(err);
    }
    else {
      cb (null, isMatch);
    }
  });
};
////////// End Schemas //////////

////////// Models //////////
var Game = mongoose.model('Game', GameSchema);
var User = mongoose.model('User', UserSchema)
////////// End Models //////////

////////// Express //////////
mongoose.connect('localhost', 'test');

var app = express();

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "change me"}));
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(3000);
////////// End Express //////////

////////// Routes + Controllers //////////
app.post('/login', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.send({ error: 'Invalid Password' });
      } else {
        return res.send({ success: 'Password matched' });
      }
    });
  });
});

app.get('/nearby_venues/:latitude/:longitude', function (req, res) {
  var CATEGORIES = ['4e39a956bd410d7aed40cbc3', '4bf58dd8d48988d1e1941735', '4e39a9cebd410d7aed40cbc4', '4bf58dd8d48988d1ba941735'];
  var CLIENT_ID = 'HPAJ2BJUXB11LUWR4OVFWHQTIOIO0DB02XR5MA1KTSGATX0K';
  var CLIENT_SECRET = 'R4QJ2TR2EJVOFGMXTBG0Q415NV3OFR4H0H4YHDS1T54S1QAX';

  var URL = 'https://api.foursquare.com/v2/venues/search?ll=' +
    req.params.latitude + ',' + req.params.longitude + '&categoryId=' +
    CATEGORIES.toString() + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;

  request(URL, function (error, response, body) {
    if (!error) {
      console.log(body);
      res.send(JSON.parse(body));
    } else {
      console.log('didnt go through');
      res.send(error);
    }
  });
});

app.post('/users/create', function (req, res) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    bio: req.body.bio
  });
  user.save(function (err) {
    if (!err) {
      console.log("Saved user to the database successfully");
      res.send(user);
    } else {
      res.send(err);
    }
  });
});

app.get('/users', function (req, res) {
  User.find(function (err, users) {
    if (!err) {
      for (var i=0; i<users.length; i++) {
        users[i] = users[i].toObject();
        delete users[i].password;
      }
      return res.send(users);
    }
  });
});

app.get('/users/:user_id', function (req, res) {
  return User.findById(req.params.user_id, function(err, user) {
    if (!err) {
      return res.send(user);
    }
  });
});

app.post('/games/create', function (req, res) {
  var game = new Game({
    created_by: "Sahat",
    sport: req.body.sport,
    geo: [req.body.latitude, req.body.longitude],
    description: req.body.description
  });

  game.players.push('Sahat');

  game.save(function (err) {
    if (!err) {
      res.send(game);
    } else {
      res.send(err);
    }
  });
});

app.post('/games/join', function (req, res) {

});

app.get('/games/user/:user_id', function (req, res) {

});

app.get('/games/nearby/:latitude/:longitude', function (req, res) {
  Game.find({ geo: { $nearSphere: [req.params.longitude, req.params.latitude] } }, function (err, games) {
    if (err) res.send(err);
    else res.send(games);
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

app.post('/comment', function (req, res) {

});
app.delete('/comment/:game_id', function (req, res) {

});
app.get('/comment/:game_id', function (req, res) {

});
////////// End Routes + Controllers //////////

console.log('Listening on http://0.0.0.0:' + 3000 );

/*
/* saved for later use
// fetch user and test password verification

 // test a failing password
 user.comparePassword('123Password', function(err, isMatch) {
 if (err) throw err;
 console.log('123Password:', isMatch); // -> 123Password: false
 });
*/
