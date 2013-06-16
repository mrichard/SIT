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

				defaults: {
					title: '',
					description: '',
					createdBy: '',
					createdDate: '', // object { type: Date, default: Date.now }
					comments: '', // array [{ body: String, date: Date, createdBy: String }]
					meta: '' // object { votes: Number }
				},

		});
	});
}).call( this );
