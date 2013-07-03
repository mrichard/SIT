(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone', 
		'models/feedUser',
		'transports/socket'
		], 
		function( Backbone, FeedUser, socket ) {

			/* Return a collection class definition */
			return Backbone.Collection.extend({
				initialize: function() {
					console.log("initialize a FeedUsers collection");
					this.ioBind('delta', socket, this.serverDelta, this);
				},

	    		model: FeedUser,

	    		url: 'feedusers',

	    		serverDelta: function( socketObject ) {
	    			console.log( "FeedUsers collection serverDelta");
	    			console.log( arguments );

	    			// if performing remove, get model first
	    			if( socketObject.action.type === "remove" ) {
	    				socketObject.action.data = this.get( socketObject.action.data._id );
	    			}
	
	    			this[ socketObject.action.type ]( socketObject.action.data );

	    			console.log( this );
	    		}
	    		
	  		});
	});
}).call( this );