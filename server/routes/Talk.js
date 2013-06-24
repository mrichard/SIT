var baucis = require('baucis');
var Talk = require('../models/Talk');
var _ = require('underscore');

var talkModel = Talk.Talk;

module.exports = {
	initRoutes: function( app ) {
		// build Baucis routes
		var talkContoller = baucis.rest({
			singular: 'talk'
		});

		// modify request to add session user details
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

		//ensure use only upvates once
		talkContoller.request( 'instance', 'put', function( request, response, next ) {

			// get the talk submitted from Mongo
			var talkId = request.body._id;
			var sessionId = request.session.account._id;

			talkModel.findOne({
				_id: talkId
			},
			function( err, talk ) {
				if( talk ) {
					console.log( "talk found in mongo DB");

					// if the user has already upvoted then return and error message
					var hasUpvoted = _.contains( talk.votes.users, sessionId );

					if( hasUpvoted ) {
						console.log("hasUpvoted!!!!");
						response.json({
							talk: talk,
							messaging: { type: 'error', message: 'You have already upvoted this talk!' }
						});
					}
					else {
						// else add the user id to the votes.users array to be saved in mongo
						request.body.votes.users.push( sessionId );
						next();
					}
					
				} else {
					console.log( err );
				}
			});


		});

		// check the documents
		talkContoller.documents( 'collection', 'post', function( request, response, next ){
			console.log( "documents" );
			console.log( request.baucis.documents );

			if( request.baucis.documents ) {
				request.baucis.documents = {
					talk: request.baucis.documents,
					messaging: { type: 'success', message: 'New talk has been created!' }
				};

			}
			response.json( request.baucis.documents );
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