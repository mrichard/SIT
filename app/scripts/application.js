(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'hbs!tmpl/welcome'
	],

	function( Backbone, Communicator, Welcome_tmpl ) {
		console.log("application.js setup");

		var welcomeTmpl = Welcome_tmpl;

		var App = new Backbone.Marionette.Application();

		/* Add application regions */
		App.addRegions({});

		/* Add application modules */
		App.module( "navModule", function( navModule, App, Backbone, Marionette, $, _, regionId ) {
			console.log("Create nav module");
			console.log( arguments );
		}, "#nav-region" );


		/* bring in: 
			Communicator singleton
			Region Manager singleton
			Have Region Manager have a api to create new regions
		*/



		/* Add initializers here */
		App.addInitializer( function () {
			console.log("Marionette AMD application has started");
			document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
		});

		return App;
	});
}).call( this );
