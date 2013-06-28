(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/talkMainItem_tmpl',
		'communicator'
	],
	function( Backbone, TalkMainItemTmpl, Communicator ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function( options ) {
				this.listenTo( this.model, "change", this.render, this );
				this.listenTo( this.model, "messaging", this.handleMessaging, this);

				console.log( "talkMinItem init: ");
				console.log( options );

				// store data that comes fro the composite view, to be used in the templates
				this.templateHelpers = {
					displayModControls: options.displayModControls
				};
			},
			
	    	template: {
				type: 'handlebars',
				template: TalkMainItemTmpl
			},

			tagName: 'tr',

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {
				"click .upvote": "handleUpvote",
				"click .talk-edit": "handleEditTalk",
				"click .talk-delete": "handleDeleteTalk"
			},

			/* on render callback */
			onRender: function() {},

			handleUpvote: function( e ) {
				e.preventDefault();
				e.stopPropagation();

				var isLoggedIn = Communicator.reqres.request( "APP:ACCOUNT:ISLOGGEDIN" );

				if( isLoggedIn ) {
					var currentVotes = this.model.get("votes");
					currentVotes.count++;

					this.model.promise = this.model.save({ votes: currentVotes }, { 
						wait: true, 
						toValidate: []
					});
				}
				else {
					Communicator.mediator.trigger( "APP:MESSAGING", { type: "error", location: "page", message: "You must be logged in to upvote!" });
				}
			},

			handleEditTalk: function() {
				Communicator.command.execute( "APP:TALK:EDIT", this.model );
			},

			handleDeleteTalk: function() {
				console.log( "handleDeleteTalk" );
				this.model.destroyTalk();
			},

			handleMessaging: function( model, messageObject, options ) {
				// handle messaging if it's destined for modal
				if( messageObject.location === "page" ) {
					Communicator.mediator.trigger( "APP:MESSAGING", messageObject );
				}
			}
		});

	});
}).call( this );