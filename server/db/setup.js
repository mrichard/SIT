var mongoose = require('mongoose');


var db

module.exports = {
	init: function( callback ) {
		try {
			//db.connection.on('open', function() {
			mongoose.connection.on('open', function() {
				console.log('Opened connection');
				callback();
			});

			db = mongoose.connect('mongodb://localhost/sit');
			console.log('Started connection, waiting for it to open');
		}
		catch (err) {
			console.log('Setting up failed:', err.message);
		}

	},

	close: function( callback ) {
		console.log('In tearDown');
		try {
		    console.log('Closing connection');
		    db.disconnect();
		    callback();
		}

		catch (err) {
		    console.log('Tearing down failed:', err.message);
		}
	},

	getDB: function() {
		return db;
	}
};