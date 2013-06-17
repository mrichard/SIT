(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/newTalk_tmpl',
		'communicator'
	],
	function( Backbone, NewTalkTmpl, Communicator ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function( options ) {
				console.log("initialize a NewTalk ItemView");
				console.log( options );
				this.templateHelpers = options.userData;
			},
			
	    	template: {
				type: 'handlebars',
				template: NewTalkTmpl
			},

			className: "talk-new",

	    	/* ui selector cache */
	    	ui: {
	    		feedbackButton: ".btn-feedback"
	    	},

			/* Ui events hash */
			events: {
				"click .close-modal": "handleClose",
				"click button[type='submit']": "handleTalkSubmit"
			},

			/* on render callback */
			onRender: function() {
				this.ui.feedbackButton.buttonTB();
			},

			handleTalkSubmit: function( e ) {
				e.preventDefault();

				this.ui.feedbackButton.buttonTB( 'loading' );
				var data = Backbone.Syphon.serialize( this );

				console.log( data );
			},

			handleClose: function() {
				Communicator.command.execute( "APP:MODAL:HIDE" );
			}
		});

	});
}).call( this );