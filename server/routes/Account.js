var account = require('../models/Account');

module.exports = {
	login: function( req, res, next ) {
		console.log("login route");
		console.log( req.body );
		account.login( req.body.email, req.body.password, function( err, doc ) {
			
		});
	},

	loginHandler: function() {

	}
};