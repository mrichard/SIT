(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/talkEmpty_tmpl',
		'communicator'
	],
	function( Backbone, TalkEmptyTmpl, Communicator  ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a TalkEmpty ItemView");
			},
			
	    	template: {
				type: 'handlebars',
				template: TalkEmptyTmpl
			},

			tagName: 'tr',

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {
				"click .no-talks-submit": "handleTalksSubmit"
			},

			/* on render callback */
			onRender: function() {},

			handleTalksSubmit: function( e ) {
				e.preventDefault();
				Communicator.command.execute( "APP:TALK:NEW" );
			}
		});

	});
}).call( this );