var socketIO = require('socket.io');

var io;
var clients = {};
var clientId = 0;
var app;

module.exports = function( options ) {
	'use strict';

	// express app
	if( options && options.app ) {
		app = options.app;
	}

	return {
		init: function( server ) {

			console.log('init socketIO');
			io = socketIO.listen( server );

			io.sockets.on( 'connection', function( socket ) {
				console.log( 'SOCKET CONNECTION EVENT: ' );

				// store user in custom storage
				socket.clientId = clientId;
				clients[ clientId ] = socket;
				clientId++;


				// listen for authenticated and push all logged in users
				socket.on( 'authenticated', function(){
					console.log( 'socket authenticated event' );
					
					this.emit('feedusers:delta', {
						message: '',
						action: {
							type: 'add',
							data: app.locals.loggedInUsers
						}
					});
				});


				// bind disconnect
				socket.on( 'disconnect', function() {
					console.log( 'SOCKET DISCONNECT EVENT: ' );
					delete clients[ clientId ];
				});
			});

		},

		getIO: function() {
			return io;
		},

		broadcast: function() {

		}
	};

};