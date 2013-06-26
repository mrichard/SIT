(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone', 
		'models/talk'
		], 
		function( Backbone, Talk ) {

			/* Return a collection class definition */
			return Backbone.Collection.extend({
				initialize: function() {
					console.log("initialize a Talks collection");
				},

	    		model: Talk,

	    		url: function() {
	    			return '/api/v1/talks/' + this.fetchType;
	    		},

	    		comparator: function( talk ) {
	    			console.log( this.comparatorKey );
	    			console.log( talk.get( this.comparatorKey ) );

	    			var compareValue = talk.get( this.comparatorKey );
	    			if( _.isObject(compareValue) ) {

	    				// created by
	    				if( compareValue.name ) {
	    					return compareValue.name;
	    				}

	    				// votes
	    				if( compareValue.count ) {
	    					return compareValue.count;
	    				}
	    			}
	    			else {
	    				return compareValue
	    			}
	    		},

	    		fetch: function( type ) {
	    			// set the fetch type
	    			this.fetchType = type ? type : '';

	    			// call fetch
	    			Backbone.Collection.prototype.fetch.apply(this, arguments);
	    		}
	    		
	  		});
	});
}).call( this );