'use strict';

//var mongo = require('mongodb')

/* jasmine test */
/* mostly a way to figure out what mongo lets you do, but should
 * also serve as an aearly waring against misconfiguration.
 * 
define( ['mongodb'], function (mongo) {
 
describe('MongoDb', function() {
	
	/*
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
	* 
	/*

	it("should run this", function(){
		expect(1).not.toBe(1);
	});
	
});

});

/**/
