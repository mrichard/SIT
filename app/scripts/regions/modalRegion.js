(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator'
	],
	function( Backbone ) {

		/* Return a Region class definition */
		return Backbone.Marionette.Region.extend({
		
			constructor: function(){
				console.log("modal region constructor");
				Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
			},

			initialize: function () {
				this.$el = this.getEl(this.el);

				// bootsrap cleanup after hidden event
				this.$el.on( "hidden", _.bind(this.cleanUp, this) );
				this.$el.on( "shown", _.bind( this.focusIt, this) );
			},

			showModal: function( view, styling ){
				console.log("modal region SHOW");

				this.styling = (styling) ? styling : ""; 
				this.$el.addClass( styling );

				// show view in region
				this.show(view);
			},

			onShow: function() {
				// bootstrap show
				this.$el.modal("show");
			},

			hideModal: function(){
				// bootstrap hide
				this.$el.modal('hide');
			},

			cleanUp: function() {
				this.$el.removeClass( this.styling );
				this.styling = "";
				this.close();
			},

			focusIt: function() {
				console.log( this );
				this.$el.find('input').eq(0).focus();
			}

		});

	});
}).call( this );


