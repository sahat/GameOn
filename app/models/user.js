var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// User schema definition
var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  token: {type: String, required: true},
  created_on: { type: Date, default: Date.now },
  avatar: String,
  bio: String
});


// Function for randomly generating keys
function randomKey (limit) {
  limit = (parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 20);
  var random = '';
  var list = [ 
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
    'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 
    'Y', 'Z' 
  ];
  while (random.length < limit) {
    random += list[Math.floor(Math.random()*62)];
  }
  return random;
}


// Pre save function
UserSchema.pre('save', function (next) {
  var user = this;

  // Hash password only if modified or new
  if (!user.isModified('password')) {
    return next();
  }

  // Generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // Hash the password with a new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // Override text password with the hashed password & set token
      user.password = hash;
      user.token = randomKey();
      next();
    });
  });
});


// Compare passwords method
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      cb(err);
    }
    else {
      cb(null, isMatch);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
