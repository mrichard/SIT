(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/logout_tmpl',
		'communicator'
	],
	function( Backbone, LogoutTmpl, Communicator ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a Logout ItemView");
				this.listenTo( this.model, "invalid", this.displayMessaging, this);
				this.listenTo( this.model, "messaging", this.handleMessaging, this);
			},
			
	    	template: {
				type: 'handlebars',
				template: LogoutTmpl
			},

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {
				"click .close-modal": "handleClose",
				"click .logout-confirm": "handleLogout"
			},

			/* on render callback */
			onRender: function() {},

			handleLogout: function( e ) {
				e.preventDefault();
				this.model.logout();
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
				console.log("Logout: displayMessaging");

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