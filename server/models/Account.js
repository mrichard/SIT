'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');

module.exports = (function() {

	var AccountSchema = new mongoose.Schema({
		email: { type: String, unique: true },
		password: { type: String },
		firstName: { type: String },
		lastName: { type: String },
		photoUrl: { type: String },
		title: { type: String }
	});

	var Account = mongoose.model( 'account', AccountSchema );

	var registerCallback = function( err ) {
		if( err ){
			return console.log( err );
		}

		return console.log( 'Account was created' );
	};

	var register = function( email, password, firstName, lastName, title, callback ) {
		var shaSum = crypto.createHash( 'sha256' );
		shaSum.update( password );

		console.log( 'Registering: ' + email );

		var user = new Account({
			email: email,
			password: shaSum.digest( 'hex' ),
			firstName: firstName,
			lastName: lastName,
			title: title
		});

		user.save( callback );
		console.log( 'Save command was sent' );
	};

	var login = function( email, password, callback ) {
		var shaSum = crypto.createHash( 'sha256' );
		shaSum.update( password );

		Account.findOne({
			email: email,
			password: shaSum.digest( 'hex' )
		},
		function( err, account ) {
			callback( err, account );
		});
	};

	var forgotPassword = function( email, callback ) {
		Account.findOne({ email: email }, function( err, account ){
			callback( err, account );
		});
	};

	return {
		login: login,
		register: register,
		forgotPassword: forgotPassword,
		Account: Account
	};
})();