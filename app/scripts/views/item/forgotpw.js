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
				this.listenTo( this.model, "invalid", this.handleError, this);
			},
			
	    	template: {
				type: 'handlebars',
				template: ForgotpwTmpl
			},

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {
				"click .close": "handleClose",
				"click .account-signup": "handleAccountSignUp",
				"click .account-login": "handleAccountLogin",
				"click button[type='submit']": "handleForgotPwSubmit"
			},

			/* on render callback */
			onRender: function() {},

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
				this.model.forgotPw( Backbone.Syphon.serialize( this ) );
			},

			handleError: function( model, errorObject, options ) {
				console.log("Login: handleError");

				this.templateHelpers = errorObject;
				this.render();
				this.templateHelpers = false;
			},

			handleClose: function() {
				Communicator.command.execute( "APP:MODAL:HIDE" );
			}
		});

	});
}).call( this );