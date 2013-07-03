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
					console.log("initialize a FeedUser model");
				},

				defaults: {},

				idAttribute: '_id'

		});
	});
}).call( this );