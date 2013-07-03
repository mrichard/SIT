(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'views/item/feedUser',
		'hbs!tmpl/composite/feedUsers_tmpl'
	],
	function( Backbone, FeedUser, FeedUsersTmpl  ) {

		/* Return a CompositeView class definition */
		return Backbone.Marionette.CompositeView.extend({
		
			initialize: function() {
				console.log("initialize a FeedUsers CompositeView");
			},
			
	    	itemView: FeedUser,
	    	
	    	template: {
				type: 'handlebars',
				template: FeedUsersTmpl
			},

	    	/* ui selector cache */
	    	ui: {},

	    	/* where are we appending the items views */
	    	itemViewContainer: ".feed-users-list",

			/* Ui events hash */
			events: {},

			/* on render callback */
			onRender: function() {}
		});

	});
}).call( this );
