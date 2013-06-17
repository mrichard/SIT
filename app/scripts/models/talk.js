(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone'
		], 
		function( Backbone ) {

			/* Return a model class definition */
			return Backbone.Model.extend({
				initialize: function() {
					console.log("initialize a Talk model");
				},

				idAttribute: '_id',

				defaults: {
					title: '',
					description: '',
					createdBy: '',
					createdDate: '', // object { type: Date, default: Date.now }
					comments: '', // array [{ body: String, date: Date, createdBy: String }]
					votes: 0 // object { votes: Number }
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

					if( invalidInputs > 0 ){
						return _.extend({ type: 'error', message: "Please fill in inputs: " + invalidString.substring( 0, (invalidString.length-2) ) }, _.clone(attributes) );
					}
				}

		});
	});
}).call( this );
