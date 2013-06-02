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

			parse: function( response, options ) {
				response.firstName = response.name.first;
				response.lastName = response.name.last;
				delete response.name;

				return response;
			}
		});

		/* Account is a sungleton */
		return new Account();
	});
}).call( this );
