'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');

module.exports = function() {

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

	var register = function( email, password, firstName, lastName ) {
		var shaSum = crypto.createHash( 'sha256' );
		shaSum.update( password );

		console.log( 'Registering: ' + email );

		var user = new Account({
			email: email,
			name: {
				first: firstName,
				last: lastName
			},
			password: shaSum.digest( 'hex' )
		});

		user.save( registerCallback );
		console.log( 'Save command was sent' );

	};

	var login = function( email, password, callback ) {
		var shaSum = crypto.createHash( 'sha256' );
		shaSum.update( password );

		Account.findOne({
			email: email,
			password: shaSum.digest( 'hex' )
		},
		function( err, doc ) {
			callback( err, doc );
		});
	};

	return {
		login: login,
		register: register,
		Account: Account
	};
};