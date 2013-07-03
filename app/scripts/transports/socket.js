(function() {
	'use strict';

	var root = this;

	root.define([
		'socket.io'
	],

	function( io ) {
		// establish te connection and return the socket
		var socket = io.connect( document.location.protocol + '//' + document.location.hostname );
		return socket;
	});
}).call( this );
