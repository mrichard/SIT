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

				// subscribe to start up events
				Communicator.mediator.on( moduleConfiguration[ this._name ], this.module.start, this.module);
			},

			moduleDefinition: function( MyModule, Controller, Backbone, Marionette, $, _ ) {
				/* no need to start with parent */
				this.startWithParent = false;

				MyModule.controller = Controller;

				MyModule.addInitializer(function(){
				    console.log("Starting Modal module !!");

				    Communicator.mediator.on( "MODAL:SHOW", this.controller.region.showModal, this.controller.region );
					Communicator.mediator.on( "MODAL:HIDE", this.controller.region.hideModal, this.controller.region );
				});
			}
		});

		return new Modal();

	});
}).call( this );
