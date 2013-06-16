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

				// subscribe to events
				Communicator.mediator.on( moduleConfiguration[ this._name ], this.module.start, this.module);
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
			},

			handleAccountLogin: function() {
				var loginView = new Login({ model: account });
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
			}
		});

		return new AccountController();
	});
}).call( this );


(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'modules/config',
		'views/item/navbar',
		'models/account'
	],
	function( Backbone, Communicator, moduleConfiguration, NavBar, account ) {

		var Navigation = Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a Navigation Controller");

				// module name
				this._name = "navigation";

				// create a region
				this.region = Communicator.reqres.request( "RM:addRegion", _.uniqueId('region_'), '#nav-region' );

				// create a module
				this.submodules = {};
				this.module = Backbone.Marionette.Module.create( this, this._name, this.moduleDefinition );

				// subscribe to events
				Communicator.mediator.on( moduleConfiguration[ this._name ], this.module.start, this.module);
			},

			moduleDefinition: function( MyModule, Controller, Backbone, Marionette, $, _ ) {
				/* no need to start with parent */
				this.startWithParent = false;

				MyModule.controller = Controller;

				MyModule.addInitializer(function(){
				    console.log("Starting navigation module !!");
				    this.controller.initNavBar();
				});
			},

			initNavBar: function() {

				// on init nav bar check if we are authenticated
				// then build the nav bar
				var navBar = new NavBar({ model: account });
				navBar.on( "NAV:ACCOUNT", this.handleAccount, this );
				this.region.show( navBar );
				account.isAuthenticated();
			},

			handleAccount: function( action ) {
				console.log("handleAccount");
				Communicator.command.execute( "APP:ACCOUNT:" + action);
			}
		});

		return new Navigation();

	});
}).call( this );
