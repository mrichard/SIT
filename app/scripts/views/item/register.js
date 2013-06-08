(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/register_tmpl'
	],
	function( Backbone, RegisterTmpl  ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a Register ItemView");
				this.listenTo( this.model, "invalid", this.handleError, this);
			},
			
	    	template: {
				type: 'handlebars',
				template: RegisterTmpl
			},

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {
				"click button[type='submit']": "handleLoginSubmit"
			},

			/* on render callback */
			onRender: function() {},

			handleLoginSubmit: function( e ){
				e.preventDefault();
				this.model.register( Backbone.Syphon.serialize(this) );
			},

			handleError: function( model, errorObject, options ) {
				console.log("Register: handleError");

				this.templateHelpers = errorObject;
				this.render();
				this.templateHelpers = false;
			}
		});

	});
}).call( this );