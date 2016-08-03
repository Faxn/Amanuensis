

var bodyParser = require('body-parser'),
	mongo = require('mongodb'),
	logger = require('morgan');

/**
 * Method to use as a callback for mongodb-node funcitons. 
 */
function logErrorReturn(err, thing){
    if(err != null){
        console.log(err);
    }
    return thing
}


var jsonParser = bodyParser.json({strict:false});

module.exports.api = function(app){
	
	app.use(logger('dev'));
	
	
	//rest api
	
	/**
	 * Get a list of ids and names of all charactersw in the database.
	 */
	app.get('/character_list', function (req, res){
		res.contentType('json');
		var list = [];
        /*
		app.db_char.find({}).toArray(function(err, chars){
			for(i in chars){
				list.push({name:chars[i].name, id:chars[i]._id});
			};
			res.send(list);
		})
        */
		
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
	app.get('/character/:id', function(req, res){
		if(req.params.id == null) {
			res.statusCode(400)
			res.end("No id provided.")
			return
		}
		var id = mongo.ObjectID(req.params.id)
		
		console.log("getting id:"+req.params.id);
		
		res.contentType('json');
		app.db_char.findOne({_id:id}, function(err, xpc){
			if(xpc == null){
				console.log('not found');
				xpc = {_id : id};
				res.send(xpc, 201);
			}else if(err){
				//TODO: do something more sane on error.
				xpc = {_id : id};
				res.send(500);
			}else{
				console.log(xpc);
				res.send(xpc);
			}
		});
	});

	
	/** Create a new character.*/
	app.post('/sheet', jsonParser, function(req,res){
		app.db_sheets.save(req.body, function(err, result){
			if(err){
				res.send(410, err)
			}else{
				res.send(req.body)
				res.status(200).end()
			}
			
		});
	});
	
	
	// update/create a character.
	app.post('/character/:id', jsonParser, function (req, res){
		//console.dir(req)
		console.log("Updating Character with: ", req.body);
		
		
		//TODO: do something about the id from the url
		if(req.body._id == undefined){
			res.status(400)
			res.send("no _id")
			res.end()
			return
		}
		
		req.body._id = mongo.ObjectID(req.body._id);
		
		app.db_char.save(req.body, function(err, result){
			if(err){
				res.send(410, err)
			}else{
				res.send(req.body)
				res.status(200).end()
			}
			
		});
	});
	
	// remove a character.
	app.delete('/character/:id', function (req, res){
		var id = mongo.ObjectID(req.params.id);
		app.db_char.remove({_id:id}, function(err, result){
			if(err){
				res.send(410, err)
			}else{
				res.send(200)
			}
			
		});
		
	});
	
	// POST /api/users gets JSON bodies
	app.post('/echo', jsonParser, function (req, res) {
		if (!req.body) return res.sendStatus(400)
		
		res.send(req.body)
		res.end()
		
	})
}
