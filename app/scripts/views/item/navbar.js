(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/navbar_tmpl'
	],
	function( Backbone, NavbarTmpl  ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a Navbar ItemView");
				this.listenTo( this.model, "change", this.render, this );
			},
			
	    	template: {
				type: 'handlebars',
				template: NavbarTmpl
			},

			tagName: 'div',

			className: 'navbar navbar-inverse navbar-fixed-top',

	    	/* ui selector cache */
	    	ui: {
	    		login: ".login",
	    		register: ".register",
	    		submitTalk: ".submit-talk",
	    		accountPref: ".account-pref"
	    	},

			/* Ui events hash */
			events: {
				"click .login": "handleLogin",
				"click .register": "handleRegister",
				"click .logout": "handleLogout",
				"click .submit-talk": "handleSubmitTalk",
				"click .account-pref": "handleAccountPref"
			},

			/* on render callback */
			onRender: function() {},

			handleLogin: function( e ) {
				e.preventDefault();
				console.log("handleLogin");
				this.trigger( "NAV:ACCOUNT", "LOGIN" );
			},

			handleLogout: function( e ) {
				e.preventDefault();
				console.log("handleLogout");
				this.trigger( "NAV:ACCOUNT", "LOGOUT" );
			},

			handleRegister: function( e ) {
				e.preventDefault();
				console.log("handleRegister");
				this.trigger( "NAV:ACCOUNT", "REGISTER" );
			},

			handleSubmitTalk: function( e ) {
				e.preventDefault();
				console.log("handleSubmitTalk");
				this.trigger( "NAV:TALK", "NEW" );
			},

			handleAccountPref: function( e ) {
				e.preventDefault();
				console.log("handleAccountPref");
			}
		});

	});
}).call( this );