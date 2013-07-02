(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'socket.io'
	],

	function( Backbone, Communicator, io ) {

		//Backbone.emulateHTTP = true;

		var App = new Backbone.Marionette.Application();

		/* Add initializers here */
		App.addInitializer( function () {
			console.log("APP:START");

			// publish a load event for the APP:START
			Communicator.mediator.trigger( "APP:LOAD", "APP:START" );

			// TEMP SOCKET IO TEST CODE
			var socket = io.connect( document.location.protocol + '//' + document.location.hostname );
			socket.on('news', function (data) {
				console.log( "socket.io data: ");
				console.log(data);
				socket.emit('my other event', { my: 'data' });
			});
		});

		return App;
	});
}).call( this );
