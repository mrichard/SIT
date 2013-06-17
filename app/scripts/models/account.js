(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone'
	], 
	function( Backbone ) {

		/* Return a model class definition */
		var Account = Backbone.Model.extend({
			initialize: function() {
				console.log("initialize a Account model");
			},

			defaults: {
				_loggedIn: false,
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				photoUrl: '',
				title: ''
			},

			idAttribute: '_id',

			urlRoot: "/api/v1/accounts",

			parse: function( response, options ) {

				// check if there is any messaging in the response
				if( response.messaging ) {

					this.promise.complete( _.bind(function() {
						this.trigger( "messaging", this, response.messaging );
						this.promise = null;
					}, this) );

				}

				// if account comes back
				if( response.account ) {

					if( !response.account.hasOwnProperty( '_loggedIn' ) ) {
						response.account._loggedIn = true;
					}

					return response.account;
				}

				return null;
			},

			validate: function( attributes, options ) {
				console.log( "Account validate");
				console.log(arguments);

				var invalidString = "";

				var invalidInputs = _.filter( attributes, function(value, key, list) {
					// if passed a specific list of attributes to validate
					if( options.toValidate ) {
						// if attribute is in the toValidate list and it has no input then it's invalid
						if( _.contains(options.toValidate, key) && !value ){
							invalidString = invalidString + key + ", ";
							return true;
						}
						else {
							return false;
						}
					} 
					// else just validate all
					else {
						if( key === '_loggedIn' ) {
							return false;
						}

						invalidString = invalidString + key + ", ";
						return !value; 
					}
				}).length;

				if( invalidInputs > 0 ){
					return _.extend({ type: 'error', message: "Please fill in inputs: " + invalidString.substring( 0, (invalidString.length-2) ) }, _.clone(attributes) );
				}
			},

			login: function( inputs ) {
				 this.promise = this.save( inputs, { 
					wait: true, 
					toValidate: ['email', 'password'],
					url: '/api/v1/login'
				});
			},

			logout: function() {
				this.promise = this.save( {}, { 
					wait: true, 
					toValidate: [],
					url: '/api/v1/logout',
					success: function( model, resp, options ) {
						console.log( "custom logout success");
						console.log( model );
					}
				});
			},

			register: function( inputs ) {
				this.promise = this.save( inputs, {
					wait: true,
					toValidate: ['email', 'password', 'firstName', 'lastName', 'title'],
					url: 'api/v1/register'
				});
			},

			forgotPw: function( inputs ) {
				this.promise = this.save( inputs, {
					wait: true,
					toValidate: ['email'],
					url: 'api/v1/forgotpw'
				});
			},
			
			isAuthenticated: function() {
				return this.fetch({
					url: 'api/v1/authenticated'
				});
			}

		});

		/* Account is a singleton */
		return new Account();
	});
}).call( this );
