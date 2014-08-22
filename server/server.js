var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    path = require('path'),
    url = require('url'),
    mongo = require('mongodb'),
    $ = require('jquery'),
    _ = require('underscore'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static')
    

// configure the app
var app = express();
app.use(bodyParser.json());
app.config = config

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

/**
 * Method to use as a callback for mongodb-node funcitons. 
 */
function logErrorReturn(err, thing){
    if(err != null){
        console.log(err);
    }
    return thing
}

//host static files.
app.use(serveStatic('public/'));


//database convience methods
function addModifier(xpc, modifier){
    if(modifier.apply_to == null){
        modifer.apply_to =[xpc_id]
    } else {
        modifier.apply_to.push("xpc_id")
    }
    //app.db_mod.
}

//rest api
app.get('/character_names', function (req, res){
    res.contentType('json');
    var names = [];
    app.db_char.find({}).toArray(function(err, chars){
        for(i in chars){
            names.push(chars[i].name);
        };
        res.send(names);
    })
    
});

//Get all Characters
app.get('/characters', function (req, res){
    var names = [];
    app.db_char.find().toArray(function(err, chars) {
        res.contentType('json');
        res.send(chars)        
    })
});

//get specific character by id.
app.get('/characters/:id', function(req, res){
    if(req.params.id == null) {
        res.statusCode(400)
        res.end("No id provided.")
        return
    }
    var id = mongo.ObjectID(req.params.id)
    
    res.contentType('json');
    app.db_char.findOne({_id:id}, function(err, xpc){
        //TODO: handle err
        res.send(xpc);
    });
});

// Add a single character to the character collection
app.post('/characters', bodyParser.json(), function (req, res){
    console.log("adding Character: ", req.body);
    //TODO: return the id of the created character or possibly anything but yes in case of error.
    app.db_char.save(req.body, logErrorReturn);
    res.end();
});

// update a character.
app.put('/characters/:id', bodyParser.json(), function (req, res){
    req.body._id = mongo.ObjectID(req.params.id)
    console.log("Updating Character: ", req.body);
    if(!req.body.name){
        res.send(400, "Character provided incomplete. Needs at least a name")
        return
    }
    app.db_char.save(req.body, function(err, result){
        if(err){
            res.send(410, err)
        }else{
            res.send(200)
        }
        
    });
});

// update a character.
app.delete('/characters/:id', function (req, res){
    app.db_char.remove({_id:req.params.id}, function(err, result){
        if(err){
            res.send(410, err)
        }else{
            res.send(200)
        }
        
    });
    
});

//host the server
app.set('port', config.server_port);
var server = http.createServer(app);
server.listen(app.get('port'), function (){});
console.log('Server running at ????:'+config.server_port);
