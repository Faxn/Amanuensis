var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    path = require('path'),
    url = require('url'),
    mongo = require('mongodb'),
    $ = require('jquery'),
    _ = require('underscore'),
    bodyParser = require('body-parser');
    serveStatic = require('serve-static')
    

// configure the app
var app = express();
app.use(bodyParser.json());

// Import the config module
var config = require('./config');
app.config = config;

// Connect to the database
mongo.MongoClient.connect(config.db_url, function(err, ndb) {
  if(!err) {
    app.db = ndb;
    app.db_char=ndb.collection("Characters")
    app.db_mod=ndb.collection("Modifiers")
  } else {
      console.log("Failed to connect to :"+config.db_url);
      console.log("Make sure the database is up and the url in config.js is correct.");
      process.abort()
  }
});


//Attach the Rest API
REST = require("./REST");
REST.api(app);





//host static files.
app.use(serveStatic('public/'));



//host the server
app.set('port', config.server_port);
var server = http.createServer(app);
server.listen(app.get('port'), function (){});
console.log('Server running at ????:'+config.server_port);
