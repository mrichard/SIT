(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'modules/config',
		'regions/modalRegion'
	],
	function( Backbone, Communicator, moduleConfiguration, ModalRegion ) {

		var Modal = Backbone.Marionette.Controller.extend({
		
			initialize: function( options ) {
				console.log("initialize a Modal Controller");

				// module name
				this._name = "modal";

				// create a region
				this.region = Communicator.reqres.request( "RM:addRegion", _.uniqueId('region_'), {
					selector: '#modal-region',
					regionType: ModalRegion 
				});

				// create a module
				this.submodules = {};
				this.module = Backbone.Marionette.Module.create( this, this._name, this.moduleDefinition );
			},

			moduleDefinition: function( MyModule, Controller, Backbone, Marionette, $, _ ) {
				/* no need to start with parent */
				this.startWithParent = false;

				MyModule.controller = Controller;

				MyModule.addInitializer(function(){
				    console.log("Starting Modal module !!");
				    this.controller.initModal();
				});
			},

			initModal: function() {
				Communicator.command.setHandler( "APP:MODAL:SHOW", this.region.showModal, this.region );
				Communicator.command.setHandler( "APP:MODAL:HIDE", this.region.hideModal, this.region );
			}
		});

		return new Modal();

	});
}).call( this );
