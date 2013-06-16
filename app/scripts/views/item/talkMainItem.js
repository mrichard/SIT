(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/talkMainItem_tmpl'
	],
	function( Backbone, TalkMainItemTmpl  ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a TalkMainItem ItemView");
			},
			
	    	template: {
				type: 'handlebars',
				template: TalkMainItemTmpl
			},

			tagName: 'tr',

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {},

			/* on render callback */
			onRender: function() {}
		});

	});
}).call( this );