var account = require('../models/Account');

module.exports = {
	login: function( req, res, next ) {
		console.log("login route");
		console.log( req.body );

		var email = req.body.email;
		var password = req.body.password;


		// check is email and password provided
		if( !email || !password ) {
			console.log( "login: missing email of password" );
			res.send( 400 );
			return
		}

		// attempt login
		account.login( req.body.email, req.body.password, function( err, account ) {

			// if account found
			if( account ) {
				console.log( "login successful:" );
				console.log( account );

				// store user account in session
				req.session.account = account;
				res.json(200, account );
			}
			else {
				console.log( "login: Unauthorized" );
				req.session.account = null;
				res.json(200, { error: 'Login Failed. Try again.' });
			}
		});
	},

	register: function( req, res, next ) {
		console.log( "register route" );
		console.log( req.body );

		// get from inputs
		var email = req.body.email;
		var password = req.body.password;
		var firstName = req.body.firstName;
		var lastName = req.body.lastName;
		var title = req.body.title;

		// call register on model
		account.register( email, password, firstName, lastName, title, function( err, account ){
			if( err ) {
				console.log( "register failed" );
				console.log( err );

				if( err.code === 11000 ){
					res.json(200, { error: 'The email used is already registered' });
					return;
				}
				res.json(200, { error: 'Unknown Registration Error' });
			}
			else {
				console.log( "register successful:" );
				console.log( account );

				res.session.account = account;
				res.json( 200, account );
			}
		});
	},

	authenticated: function( req, res, next ) {
		if( req.session.account ) {
			res.json( 200, req.session.account );
		} else {
			res.send( 401 );
		}
	}
};




