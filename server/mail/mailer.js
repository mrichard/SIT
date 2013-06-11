var nodemailer = require('nodemailer');

var config = {
	mail: require('./config/mail')
};

module.exports = {
	sendMail: function( email, subject, message ) {
		var smtpTransport = nodemailer.createTransport( 'SMTP', config.mail );

		smtpTransport.sendMail({
			from: 'mike@mike.com',
			to: email,
			subject: subject,
			text: message
		});
	}
};