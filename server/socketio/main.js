var socketIO = require('socket.io');


var io;

module.exports = {
	init: function( server ) {
		console.log("init socketIO");
		io = socketIO.listen( server );
	},

	getIO: function() {
		return io;
	}
};