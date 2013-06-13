var nodemailer = require('nodemailer');

var config = {
	mail: require('../config/mail')
};

module.exports = {
	sendMail: function( email, subject, message, callback ) {
		var smtpTransport = nodemailer.createTransport( 'SMTP', config.mail );

		smtpTransport.sendMail({
			from: config.mail.auth.user,
			to: email,
			subject: subject,
			text: message
		},
		callback);
	}
};