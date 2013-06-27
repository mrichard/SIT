var baucis = require('baucis');
var Talk = require('../models/Talk');
var _ = require('underscore');

var talkModel = Talk.Talk;

// build Baucis routes
var talkContoller = baucis.rest({
	singular: 'talk'
});

module.exports = {
	initRoutes: function( app ) {

		// check the get request and modify the query if needed
		talkContoller.query( 'collection', 'get', function( request, response, next ) {
			console.log("checking GET TALKS query");
			console.log( request.query );

			// if a request for my tlaks comes in then modify the baucis query
			if( request.query.mine === 'true' ) {
				console.log( "locating only " + request.session.account.firstName + " " + request.session.account.lastName + " talks.")
				request.baucis.query.where('createdBy.id', request.session.account._id);
			}

			next();
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
					console.log( talk );
					console.log( "request body is: " );
					console.log( request.body );

					// if the user has already upvoted then return and error message
					var userInVotesList = _.contains( talk.votes.users, sessionId );
					var votesIncreased = (request.body.votes.count > talk.votes.count);

					// if tring to upvote and already in users list then send error message
					if( votesIncreased && userInVotesList ) {

						console.log("hasUpvoted!!!!");
						response.json({
							talk: talk,
							messaging: { type: 'error', message: 'You have already upvoted this talk!' }
						});
					} else {
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


		// delete action
		talkContoller.documents( 'instance', 'del', function( request, response, next ){
			console.log( "DELETE: documents" );

			request.baucis.documents = {
				messaging: { type: 'success', message: 'Talk successfully deleted!' }
			};

			response.json( request.baucis.documents );
		});


		app.use( '/api/v1', baucis() );
	}
	
};