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
		
			initialize: function() {
				this.listenTo( this.model, "change", this.render, this );
				this.listenTo( this.model, "messaging", this.handleMessaging, this);
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
				"click .upvote": "handleUpvote"
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

					this.model.promise = this.model.save( currentVotes, { 
						wait: true, 
						toValidate: []
					});
				}
				else {
					alert( "you must be logged in to upvote!!");
				}
			},

			handleMessaging: function( model, messageObject, options ) {
				// TODO send this to messaging module
				alert( messageObject.message );
			}
		});

	});
}).call( this );