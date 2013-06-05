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
				email: false,
				password: '',
				firstName: '',
				lastName: '',
				photoUrl: '',
				title: ''
			},

			urlRoot: "/api/v1/accounts",

			parse: function( response, options ) {
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
				this.save( inputs, { 
					wait: true, 
					toValidate: ['email', 'password'],
					url: '/api/v1/login'
				});
			}

		});

		/* Account is a singleton */
		return new Account();
	});
}).call( this );
