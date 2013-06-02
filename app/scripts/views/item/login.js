(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/login_tmpl'
	],
	function( Backbone, LoginTmpl  ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a Login ItemView");
				this.listenTo( this.model, "invalid", this.handleError, this);
			},
			
	    	template: {
				type: 'handlebars',
				template: LoginTmpl
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
				this.model.save( Backbone.Syphon.serialize(this), { wait: true, toValidate: ['email', 'password'] });
			},

			handleError: function( model, errorObject, options ) {
				console.log("Login: handleError");
				console.log(arguments);

				this.templateHelpers = errorObject;
				this.render();
				this.templateHelpers = false;
			}
		});

	});
}).call( this );