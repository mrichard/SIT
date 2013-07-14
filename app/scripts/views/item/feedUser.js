(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/feedUser_tmpl'
	],
	function( Backbone, FeedUserTmpl  ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log('initialize a FeedUser ItemView');
			},
			
			template: {
				type: 'handlebars',
				template: FeedUserTmpl
			},

			tagName: 'li',

			className: 'new-item',

			/* ui selector cache */
			ui: {},

			/* Ui events hash */
			events: {},

			/* on render callback */
			onRender: function() {}
		});

	});
}).call( this );


