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
				this.$el.on("hidden", this.close);
			},

			showModal: function( view, styling ){
				console.log("modal region SHOW");

				this.styling = (styling) ? styling : ""; 
				this.$el.addClass( styling );

				// show view in region
				this.show(view);
			},

			onShow: function() {
				this.$el.modal("show");
			},

			hideModal: function(){
				// trigger bootstrap modal event
				this.$el.modal('hide');

				// trigger region close
				setTimeout( _.bind( function(){ 
					this.$el.removeClass( this.styling );
					this.styling = "";
					this.close();
				}, this), 400);
			}

		});

	});
}).call( this );


