var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// User schema definition
var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  avatar: String,
  bio: String,
  token: {type: String, required: true},
  created_on: { type: Date, default: Date.now }
});


// Pre save function
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
