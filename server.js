// Require libraries
var request = require('request'),
    express = require('express'),
    mongoose = require('mongoose'),
    config = require('./config/config');


// Initialize Application
var app = express();


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


// Listen on Port
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
