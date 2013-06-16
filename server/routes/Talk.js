var baucis = require('baucis');
var talk = require('../models/Talk');

module.exports = {
	initRoutes: function( app ) {
		// build Baucis routes
		baucis.rest({
			singular: 'talk',
		});

		app.use( '/api/v1', baucis() );

		// TODO: need to add middle ware to append response messaging
		// TODO: need to add middle ware to add user id 
	}
};