(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone', 
		'models/talk'
		], 
		function( Backbone, Talk ) {

			/* Return a collection class definition */
			return Backbone.Collection.extend({
				initialize: function() {
					console.log("initialize a Talks collection");
				},

	    		model: Talk,

	    		url: '/api/v1/talks'
	    		
	  		});
	});
}).call( this );