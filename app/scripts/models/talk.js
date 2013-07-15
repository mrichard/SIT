(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator'
		], 
		function( Backbone, Communicator ) {

			/* Return a model class definition */
			return Backbone.Model.extend({
				initialize: function() {
				},

				idAttribute: '_id',

				defaults: {
					title: '',
					description: '',
					createdBy: '',
					createdDate: '', // object { type: Date, default: Date.now }
					comments: '', // array [{ body: String, date: Date, createdBy: String }]
					votes: {
						count: 0
					} // object { votes: Number }
				},

				parse: function( response, options ) {

					// check if there is any messaging in the response
					if( response.messaging ) {
						
						this.promise.always( _.bind(function() {
							this.trigger( "messaging", this, response.messaging );
							this.promise = null;
						}, this) );
					}

					// if talk comes back
					if( response.talk ) {
						response.talk.createdDate = ( new Date(response.talk.createdDate) ).toLocaleDateString();
						return response.talk;
					}
					else {
						response.createdDate = ( new Date(response.createdDate) ).toLocaleDateString();
						return response;
					}
				},

				validate: function( attributes, options ) {
					console.log( "Talk validate");
					console.log(arguments);

					var invalidString = "";

					var invalidInputs = _.filter( attributes, function(value, key, list) {

						// if passed a specific list of attributes to validate
						if( options.toValidate ) {
							// if attribute is in the toValidate list and it has no input then it's invalid
							if( _.contains(options.toValidate, key) && value === '' ){
								invalidString = invalidString + key + ", ";
								return true;
							}
							else {
								return false;
							}
						} 
						// else just validate all
						else {
							if( value === '' ) {
								invalidString = invalidString + key + ", ";
								return true;
							} else {
								return false;
							}
						}

					}).length;

					console.log( "invalidInputs === " + invalidInputs );

					if( invalidInputs > 0 ){
						return _.extend({ type: 'error', message: "Please fill in inputs: " + invalidString.substring( 0, (invalidString.length-2) ) }, _.clone(attributes) );
					}
				},

				destroyTalk: function() {
					// destroy the model and then look for messagin in the response
					this.destroy({ 
						wait: true
					}).always( function( resp ){
						console.log("destroy: always");
						Communicator.mediator.trigger( "APP:MESSAGING", resp.messaging );
					});
				}

		});
	});
}).call( this );
