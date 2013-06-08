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
				loggedIn: false,
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

				if( response.error ) {
					this.promise.complete( _.bind(function() {
						this.trigger( "invalid", this, { error: response.error });
						this.promise = null;
					}, this) );

					return null;
				}

				response.loggedIn = true
				return response;
			},

			validate: function( attributes, options ) {
				console.log( "Account validate");
				console.log(arguments);

				var invalidInputs = _.filter( attributes, function(value, key, list) {
					// if passed a specific list of attributes to validate
					if( options.toValidate ) {
						// if attribute is in the toValidate list and it has no input then it's invalid
						return (_.contains(options.toValidate, key) && !value);
					} 
					// else just validate all
					else {
						return !value; 
					}
				}).length;

				if( invalidInputs > 0 ){
					return _.extend({ error: "Please fill in all inputs" }, _.clone(attributes) );
				}
			},

			login: function( inputs ) {
				 this.promise = this.save( inputs, { 
					wait: true, 
					toValidate: ['email', 'password'],
					url: '/api/v1/login',
					success: function( model, resp, options ) {
						console.log('custom login success handler');
						console.log( model );
					}
				});
			},

			register: function( inputs ) {
				this.promise = this.save( inputs, {
					wait: true,
					toValidate: ['email', 'password', 'firstName', 'lastName', 'title'],
					url: 'api/v1/register',
					success: function( model, resp, options ) {
						console.log('custom register success handler');
						console.log( model );
					}
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
