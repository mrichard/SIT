(function() {
	'use strict';

	var root = this;
	var _ = root._;

	root.define([
		'backbone',
		'communicator',
		'modules/config',
	],
	function( Backbone, Communicator, moduleConfiguration ) {

		/* Return a Region class definition */
		var ModuleLoader = Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a ModuleLoader Controller");

				// listen for module load event
				Communicator.mediator.on( "APP:LOAD", this.handleLoad, this);
			},

			handleLoad: function( event ) {
				console.log( "LOADING MODULES FOR EVENT: " + event );

				// run through module config 
				var preLoadModules = [];
				_.each( moduleConfiguration, function(value, key, list) {
					
					if( value === event ) {
						preLoadModules.push( 'modules/' + key );
					}
				});

				// load modules and start them
				root.require(preLoadModules, function(){
					var args = Array.prototype.slice.call(arguments, 0);

					_.each( args, function( module ){
						module.module.start();
					});
				});
			}
		});

		return new ModuleLoader();

	});
}).call( this );