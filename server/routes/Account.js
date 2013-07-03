var account = require('../models/Account');
var mailer = require('../mail/mailer')

var socket = require('../socketio/main');

module.exports = {
	login: function( req, res, next ) {
		console.log("login route");
		console.log( req.body );

		var email = req.body.email;
		var password = req.body.password;


		// check is email and password provided
		if( !email || !password ) {
			res.json( 200, { type: 'error', message: "Missing: Email or Password. Try again." });
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

				// TEMP SPOT FOR SOCKET IO
				socket.getIO().sockets.emit('feedusers:delta', {
					message: account.firstName + ' ' + account.lastName + ' just logged in',
					action: {
						type: "add",
						data: account
					}
				});

				// send http response
				res.json(200, {
					account: account,
					messaging: { type: 'success', message: 'You are now logged in. Window will close shortly.' }
				});

				return;
			}
			else {
				console.log( "login: Unauthorized" );
				req.session.account = null;
				res.json(200, { messaging: { type: 'error', message: 'Login Failed. Try again.' } });
			}
		});
	},

	logout: function( req, res, next ) {
		console.log( "logout route" );
		console.log( req.body );

		// TEMP SPOT FOR SOCKET IO
		socket.getIO().sockets.emit('feedusers:delta', {
			message: req.session.account.firstName + ' ' + req.session.account.lastName + ' just logged out',
			action: {
				type: "remove",
				data: req.session.account
			}
		});

		req.session.account = null;

		res.json(200, {
			account: { 
				_loggedIn: false,
				email: "",
				password: "",
				firstName: "",
				lastName: "",
				photoUrl: "",
				title: ""
			},
			messaging: { type: 'success', message: 'You are logged out. Window will close shortly.' }
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
					res.json( 200, { messaging: { type: 'error', message: 'The email used is already registered' } });
					return;
				}
				res.json( 200, { messaging: { type: 'error', message: 'Unknown Registration Error' } });

				return;
			}
			else {
				console.log( "register successful:" );
				console.log( account );

				req.session.account = account;

				res.json( 200, {
					account: account,
					messaging: { type: 'success', message: 'You are now registered. Window will close shortly.' }
				});
			}
		});
	},

	forgotpw: function( req, res, next ) {
		console.log( "forgot PW route" );
		console.log( req.body );

		var email = req.body.email;

		if( !email ) {
			res.json( 200, { messaging: { type: 'error', message: "Email not provided. Enter your email." } });
			return;
		}

		account.forgotPassword( email, function( err, account ){
			if( err ) {
				console.log( "cannot find account" );
				console.log( err );

				res.json( 200, { messaging: { type: 'error', message: "Cannot find email. Please register." } });
				return;
			}
			else if ( !account ) {
				res.json( 200, { messaging: { type: 'error', message: "Cannot find email. Please register." } });
				return;
			}
			else {
				// email person and send message to user
				var resetPwUrl = 'http://' + req.headers.host + '/resetpw?account=' + account._id;
				
				mailer.sendMail( account.email, "SIT Password Reset", "Click here to reset your password: " + resetPwUrl, function( error, response ){ 
					if( err ) {
						res.json( 200, { messaging: { type: 'error', message: "Sorry, there was an error sending you an email. Try again." } });
						return;
					}
					else {
						res.json( 200, { messaging: { type: 'success', message: "An email was sent. Please follow the instructions in the email." } });
					}
				});
			}
		});

	},

	authenticated: function( req, res, next ) {
		if( req.session.account ) {

			// TEMP SPOT FOR SOCKET IO
			socket.getIO().sockets.emit('feedusers:delta', {
				message: req.session.account.firstName + ' ' + req.session.account.lastName + ' just logged in',
				action: {
					type: "add",
					data: req.session.account
				}
			});

			res.json( 200, { account: req.session.account });
		} else {



			// TEMP SPOT FOR SOCKET IO 
			/* TODO - need redis store for logged in users
			socket.getIO().sockets.emit('feedusers:delta', {
				message: req.session.account.firstName + ' ' + req.session.account.lastName + ' just logged in',
				action: {
					type: "add",
					data: req.session.account
				}
			});
			*/

			res.send( 401 );
		}
	}
};




