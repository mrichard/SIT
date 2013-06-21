var baucis = require('baucis');
var talk = require('../models/Talk');


module.exports = {
	initRoutes: function( app ) {
		// build Baucis routes
		var talkContoller = baucis.rest({
			singular: 'talk'
		});

		talkContoller.request( 'collection', 'post', function( request, response, next ) {
			console.log( "baucis REQUEST middle ware START");
			console.log( request.body );

			request.body['createdBy'] = { 
				id: request.session.account._id,
				name: request.session.account.firstName + " " + request.session.account.lastName
			};
			request.body['createdDate'] = (new Date()).getTime();

			console.log( request.body );
			console.log( "baucis REQUEST middle ware END");

			next();
		});

		app.use( '/api/v1', baucis() );

		// TODO: need to add middle ware to append response messaging
		// TODO: need to add middle ware to add user id 

		// title: in data
	    // description: in data
	    // createdBy: in session
	    // createdDate: // system now time
	    // comments: 
	    // votes: // 0

	}
	
};