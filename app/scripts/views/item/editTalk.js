(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/talk_tmpl',
		'communicator'
	],
	function( Backbone, TalkTmpl, Communicator ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function( options ) {
				console.log("initialize a EditTalk ItemView");
				console.log( options );
				this.templateHelpers = _.extend( this.templateHelpers || {}, options.userData );

				this.listenTo( this.model, "invalid", this.displayMessaging, this);
				this.listenTo( this.model, "messaging", this.handleMessaging, this);
			},
			
	    	template: {
				type: 'handlebars',
				template: TalkTmpl
			},

			templateHelpers: {
				pageTitle: "EDIT TALK",
				pageDescription: "Edit talk proposal details below."
			},

			className: "talk-modal",

	    	/* ui selector cache */
	    	ui: {
	    		feedbackButton: ".btn-feedback"
	    	},

			/* Ui events hash */
			events: {
				"click .close-modal": "handleClose",
				"click button[type='submit']": "handleTalkSubmit"
			},

			/* on render callback */
			onRender: function() {
				this.ui.feedbackButton.buttonTB();
			},

			handleTalkSubmit: function( e ) {
				e.preventDefault();

				console.log( "handleTalkSubmit" );
				console.log( this );

				this.ui.feedbackButton.buttonTB( 'loading' );
				var data = Backbone.Syphon.serialize( this );
				console.log( data );


				this.model.promise = this.model.save( data, {
					wait: true,
					toValidate: [ 'title', 'description' ]
				});
			},

			handleMessaging: function( model, messageObject, options ) {

				// if successful login plan delay success event
				if( messageObject.type === 'success' ) {
					console.log( "new talk messaging success" );
					setTimeout( function(){
						Communicator.command.execute( "APP:MODAL:HIDE" );
					}, 2000);
				}

				this.displayMessaging.apply( this, arguments );
			},

			displayMessaging: function( model, messageObject, options ) {
				console.log("Register: displayMessaging");

				// handle messaging if it's destined for modal
				if( messageObject.location === "modal" ) {
					this.templateHelpers = _.extend( this.templateHelpers || {}, messageObject );
					this.render();
					delete this.templateHelpers.type;
				}
			},

			handleClose: function() {
				Communicator.command.execute( "APP:MODAL:HIDE" );
			}
		});

	});
}).call( this );