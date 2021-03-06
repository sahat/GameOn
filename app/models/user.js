var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var emailValidator = require('email-validator').validate;

// User schema definition
var UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true, required: true, validate: emailValidator, index: { unique: true } },
  password: { type: String, required: true },
  token: {type: String, default: Math.random().toString(36).substring(3)},
  created_on: { type: Date, default: Date.now },
  avatar: { type: String, default: '', trim: true },
  bio: { type: String, default: '', trim: true }
});


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
      user.token = Math.random().toString(36).substring(3);
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
