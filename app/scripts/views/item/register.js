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
				this.listenTo( this.model, "invalid", this.handleError, this);
			},
			
	    	template: {
				type: 'handlebars',
				template: RegisterTmpl
			},

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {
				"click .close-modal": "handleClose",
				"click .account-login": "handleAccountLogin",
				"click .account-forgotpw": "handleForgotPw",
				"click button[type='submit']": "handleLoginSubmit"
			},

			/* on render callback */
			onRender: function() {},

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

			handleLoginSubmit: function( e ){
				e.preventDefault();
				this.model.register( Backbone.Syphon.serialize(this) );
			},

			handleError: function( model, errorObject, options ) {
				console.log("Register: handleError");

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