(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'modules/config',
		'models/account',
		'views/item/login',
		'views/item/logout',
		'views/item/register',
		'views/item/forgotpw'
	],
	function( Backbone, Communicator, moduleConfiguration, account, Login, Logout, Register, ForgotPw ) {

		var AccountController = Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a Account Controller");

				this._name = "account";

				//create a module
				this.submodules = {};
				this.module = Backbone.Marionette.Module.create( this, this._name, this.moduleDefinition );
			},

			moduleDefinition: function( MyModule, Controller, Backbone, Marionette, $, _ ) {
				/* no need to start with parent */
				this.startWithParent = false;

				MyModule.controller = Controller;

				MyModule.addInitializer(function(){
				    console.log("Starting Account module !!");
				    this.controller.initAccount();
				});
			},

			initAccount: function() {
				Communicator.command.setHandler( "APP:ACCOUNT:LOGIN", this.handleAccountLogin, this );
				Communicator.command.setHandler( "APP:ACCOUNT:LOGOUT", this.handleAccountLogout, this );
				Communicator.command.setHandler( "APP:ACCOUNT:REGISTER", this.handleAccountRegister, this );
				Communicator.command.setHandler( "APP:ACCOUNT:FORGOTPW", this.handleAccountForgotPw, this );

				Communicator.reqres.setHandler( "APP:ACCOUNT:ISLOGGEDIN", this.isLoggedIn, this );
				Communicator.reqres.setHandler( "APP:ACCOUNT:USER", this.getUser, this );
			},

			handleAccountLogin: function( previousAction ) {

				this.handlePreviousAction( previousAction );

				var loginView = new Login({ model: account });
				this.listenTo( loginView, "ACCOUNT:ACTION:SUCCESS", this.handleActionSuccess, this );

				Communicator.command.execute( "APP:MODAL:SHOW", loginView );
			},

			handleAccountLogout: function() {
				var logoutView = new Logout({ model: account });
				Communicator.command.execute( "APP:MODAL:SHOW", logoutView );
			},

			handleAccountRegister: function() {
				var registerView = new Register({ model: account });
				Communicator.command.execute( "APP:MODAL:SHOW", registerView );
			},

			handleAccountForgotPw: function() {
				var forgotPwView = new ForgotPw({ model: account });
				Communicator.command.execute( "APP:MODAL:SHOW", forgotPwView );
			},

			isLoggedIn: function() {
				return !!account.get( "_loggedIn" );
			},

			getUser: function() {
				var fullName = account.get( "firstName" ) + " " + account.get( "lastName" );
				var userTitle = account.get( "title" );
				return {
					fullName: fullName,
					userTitle: userTitle
				};
			},

			handlePreviousAction: function( previousAction ) {
				this.previousAction = previousAction ? previousAction : null;
			},

			handleActionSuccess: function() {

				// if a previous action was store before do that
				if( this.previousAction ) {
					this.previousAction.resolve();
					this.previousAction = null;
				}
				// else run close Login
				else {
					Communicator.command.execute( "APP:MODAL:HIDE" );
				}
			}
		});

		return new AccountController();
	});
}).call( this );