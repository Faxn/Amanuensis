var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    path = require('path'),
    url = require('url'),
    mongo = require('mongodb'),
    $ = require('jquery'),
    _ = require('underscore')
    

// configure the app
var app = express();
app.use(express.bodyParser());

// Connect to the database
mongo.MongoClient.connect("mongodb://localhost:27017/test", function(err, ndb) {
  if(!err) {
    console.log("We are connected");
    app.db = ndb;
    app.db_char=ndb.collection("Characters")
    app.db_mod=ndb.collection("Modifiers")
  } else {
      exit(1)
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
app.use(express.static(__dirname + '/static'));

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

app.get('/characters', function (req, res){
    res.contentType('json');
    var names = [];
    app.db_char.find({}).toArray(function(err, chars){
        for(i in chars){
            names.push(chars[i]);
        };
        res.send(names);
    })
});

app.get('/modifiers', function (req, res){
    res.contentType('json');
    var names = [];
    app.db_mod.find({}).toArray(function(err, chars){
        for(i in chars){
            names.push(chars[i]);
        };
        res.send(names);
    })
});

app.get('/charbyid', function(req, res){
    if(req.query.id == null) {
        res.statusCode(400)
        res.end("No id provided.")
        return
    }
    console.log("getting Character:" + req.query.id)
    var id = mongo.ObjectID(req.query.id)
    
    res.contentType('json');
    app.db_char.findOne({_id:id}, function(err, xpc){
        //TODO: handle err
        
        var ret = [];
        for(i in xpc.modifiers){
            ret.push(app.db_mods.findOne({_id: xpc.modifiers[i]}, logErrorReturn))
        }
        
        res.send(xpc);
    });
});

app.post('/addchar', function (req, res){
    console.log("adding Character: ", req.body);
    app.db_char.save(req.body, logErrorReturn);
    res.end();
});

app.post('/addmod', function (req, res){
    console.log("adding Modifier:", req.body);
    if(!req.body.stat instanceof Array){
        req.body.stat = [req.body.stat]
    }
    if(req.body.stacking != null){
       req.body.stacking = 
            ["true"].indexOf(req.body.stacking) >= 0
    }
    app.db_mod.save(req.body, logErrorReturn);
    res.end();
});

app.post('/applymod', function (req, res){
    var charid = mongo.ObjectID(req.body.charid)
    var modid  = mongo.ObjectID(req.body.modid)
    console.log("applying "+modid+" to "+charid);
    app.dp_char.update({_id:charid},{$push:{modifiers:modid}})
    
})


//host the server
app.set('port', 8080);
var server = http.createServer(app);
server.listen(app.get('port'), function (){});
console.log('Server running at ????:8080');
