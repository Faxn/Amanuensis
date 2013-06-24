var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    path = require('path'),
    url = require('url'),
    mongo = require('mongodb'),
    $ = require('jquery'),
    _ = require('underscore')
    
    
var app = express();

//host static files.
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.send('hello world');
});

//temporary testing code
var testpc = {
    "name":"leai",
    "modifiers":[
        {
            "stat":"dexterity",
            "value":10
        },
        {
            "stat":"dexterity",
            "type":"racial",
            "value":2
        }
    ],
}

function getStat(xpc, stat){
    ret = 0;
    for (i in xpc.modifiers){
        console.log(xpc.modifiers[i]);
        ret += xpc.modifiers[i].value;
    }
    return ret;
}

app.get('/test', function (req, res){
    res.send("" + getStat(testpc, "dexterity"));
});

app.set('port', 8080);
var server = http.createServer(app);
server.listen(app.get('port'), function (){});
console.log('Server running at ????:8080');
