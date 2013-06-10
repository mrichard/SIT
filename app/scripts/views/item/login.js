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
				this.listenTo( this.model, "invalid", this.handleError, this);
			},
			
	    	template: {
				type: 'handlebars',
				template: LoginTmpl
			},

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {
				"click .account-signup": "handleAccountSignUp",
				"click .account-forgotpw": "handleForgotPw",
				"click button[type='submit']": "handleLoginSubmit"
			},

			/* on render callback */
			onRender: function() {},

			handleLoginSubmit: function( e ){
				e.preventDefault();
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

			handleError: function( model, errorObject, options ) {
				console.log("Login: handleError");

				this.templateHelpers = errorObject;
				this.render();
				this.templateHelpers = false;
			}
		});

	});
}).call( this );