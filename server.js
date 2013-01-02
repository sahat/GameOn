var request = require('request');
var express = require('express');
var mongoose = require('mongoose');

var app = express();

var config = require('./config/config');
var auth = require('./config/middlewares/authenticate')

// DB Connection
mongoose.connect(config.db);

// Express Configuration
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
require('./config/routes')(app);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
