(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/forgotpw_tmpl',
		'communicator'
	],
	function( Backbone, ForgotpwTmpl, Communicator ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a Forgotpw ItemView");
				this.listenTo( this.model, "invalid", this.displayMessaging, this);
				this.listenTo( this.model, "messaging", this.handleMessaging, this);
			},
			
	    	template: {
				type: 'handlebars',
				template: ForgotpwTmpl
			},

	    	/* ui selector cache */
	    	ui: {
	    		feedbackButton: ".btn-feedback"
	    	},

			/* Ui events hash */
			events: {
				"click .close-modal": "handleClose",
				"click .account-signup": "handleAccountSignUp",
				"click .account-login": "handleAccountLogin",
				"click button[type='submit']": "handleForgotPwSubmit"
			},

			/* on render callback */
			onRender: function() {
				this.ui.feedbackButton.buttonTB();
			},

			handleAccountSignUp: function( e ) {
				e.preventDefault();
				e.stopPropagation();
				Communicator.command.execute( "APP:ACCOUNT:REGISTER" );
			},

			handleAccountLogin: function( e ) {
				e.preventDefault();
				e.stopPropagation();
				Communicator.command.execute( "APP:ACCOUNT:LOGIN" );
			},

			handleForgotPwSubmit: function( e ) {
				e.preventDefault();

				this.ui.feedbackButton.buttonTB( 'loading' );
				this.model.forgotPw( Backbone.Syphon.serialize( this ) );
			},

			handleMessaging: function( model, messageObject, options ) {
				if( messageObject.type === 'success' ) {
					setTimeout( function(){
						Communicator.command.execute( "APP:MODAL:HIDE" );
					}, 2000);
				}

				this.displayMessaging.apply( this, arguments );
			},

			displayMessaging: function( model, messageObject, options ) {
				console.log("Register: displayMessaging");

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