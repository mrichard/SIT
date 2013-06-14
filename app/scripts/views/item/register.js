(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/register_tmpl',
		'communicator'
	],
	function( Backbone, RegisterTmpl, Communicator ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a Register ItemView");
				this.listenTo( this.model, "invalid", this.displayMessaging, this);
				this.listenTo( this.model, "messaging", this.handleMessaging, this);
			},
			
	    	template: {
				type: 'handlebars',
				template: RegisterTmpl
			},

	    	/* ui selector cache */
	    	ui: {
	    		feedbackButton: ".btn-feedback"
	    	},

			/* Ui events hash */
			events: {
				"click .close-modal": "handleClose",
				"click .account-login": "handleAccountLogin",
				"click .account-forgotpw": "handleForgotPw",
				"click button[type='submit']": "handleLoginSubmit"
			},

			/* on render callback */
			onRender: function() {
				this.ui.feedbackButton.buttonTB();
			},

			handleAccountLogin: function( e ) {
				e.preventDefault();
				e.stopPropagation();
				Communicator.command.execute( "APP:ACCOUNT:LOGIN" );
			},

			handleForgotPw: function( e ) {
				e.preventDefault();
				e.stopPropagation();
				Communicator.command.execute( "APP:ACCOUNT:FORGOTPW" );
			},

			handleLoginSubmit: function( e ) {
				e.preventDefault();

				this.ui.feedbackButton.buttonTB( 'loading' );
				this.model.register( Backbone.Syphon.serialize(this) );
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