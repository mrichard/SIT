
(function() {
	'use strict';

	var root = this;

	root.define([
		'models/message'
		],
		function( Message ) {

			describe('Message Model', function () {
				it('should have a default empty string type', function () {
					var message = new Message();
					expect( message.get('type') ).to.equal('');
				});
			});

		});

}).call( this );