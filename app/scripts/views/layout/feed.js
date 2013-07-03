(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/layout/feed_tmpl'
	],
	function( Backbone, FeedTmpl  ) {

		/* Return a Layout class definition */
		return Backbone.Marionette.Layout.extend({
		
			initialize: function() {
				console.log("initialize a Feed Layout");
			},
			
	    	template: {
				type: 'handlebars',
				template: FeedTmpl
			},
	    	
	    	className: 'feed well',

	    	/* Layout sub regions */
	    	regions: {
	    		users: ".feed-users",
	    		notices: ".feed-notices"
	    	},

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {},

			/* on render callback */
			onRender: function() {}
		});

	});
}).call( this );