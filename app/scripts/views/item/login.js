(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/login_tmpl',
		'communicator'
	],
	function( Backbone, LoginTmpl, Communicator  ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a Login ItemView");
				this.listenTo( this.model, "invalid", this.displayMessaging, this);
				this.listenTo( this.model, "messaging", this.handleMessaging, this);
			},
			
	    	template: {
				type: 'handlebars',
				template: LoginTmpl
			},

	    	/* ui selector cache */
	    	ui: {
	    		feedbackButton: ".btn-feedback"
	    	},

			/* Ui events hash */
			events: {
				"click .close-modal": "handleClose",
				"click .account-signup": "handleAccountSignUp",
				"click .account-forgotpw": "handleForgotPw",
				"click button[type='submit']": "handleLoginSubmit"
			},

			/* on render callback */
			onRender: function() {
				this.ui.feedbackButton.buttonTB();
			},

			handleLoginSubmit: function( e ){
				e.preventDefault();

				this.ui.feedbackButton.buttonTB( 'loading' );
				this.model.login( Backbone.Syphon.serialize( this ) );
			},

			handleAccountSignUp: function( e ) {
				e.preventDefault();
				e.stopPropagation();
				Communicator.command.execute( "APP:ACCOUNT:REGISTER" );
			},

			handleForgotPw: function( e ) {
				e.preventDefault();
				e.stopPropagation();
				Communicator.command.execute( "APP:ACCOUNT:FORGOTPW" );
			},

			handleMessaging: function( model, messageObject, options ) {

				// if successful login plan delay success event
				if( messageObject.type === 'success' ) {
					setTimeout( _.bind( function(){
						this.trigger( "ACCOUNT:ACTION:SUCCESS" );
					}, this ), 2000);
				}

				this.displayMessaging.apply( this, arguments );
			},

			displayMessaging: function( model, messageObject, options ) {
				console.log("Login: displayMessaging");

				this.templateHelpers = messageObject;
				this.render();
				this.templateHelpers = false;
			},

			handleClose: function() {
				Communicator.command.execute( "APP:MODAL:HIDE" );
			}
		});

	});
}).call( this );