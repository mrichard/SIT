(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'models/account',
		'views/item/login',
		'views/item/register'
	],
	function( Backbone, Communicator, account, Login, Register ) {

		var AccountController = Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a Account Controller");
				Communicator.command.setHandler( "APP:ACCOUNT:LOGIN", this.handleAccountLogin, this );
				Communicator.command.setHandler( "APP:ACCOUNT:REGISTER", this.handleAccountRegister, this );
			},

			handleAccountLogin: function() {
				var loginView = new Login({ model: account });
				Communicator.command.execute( "APP:MODAL:SHOW", loginView );
			},

			handleAccountRegister: function() {
				var registerView = new Register({ model: account });
				Communicator.command.execute( "APP:MODAL:SHOW", registerView );
			}
		});

		return new AccountController();
	});
}).call( this );