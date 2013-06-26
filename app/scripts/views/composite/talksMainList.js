(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'views/item/talkMainItem',
		'hbs!tmpl/composite/talksMainList_tmpl',
		'views/item/talkEmpty',
		'communicator'
	],
	function( Backbone, TalkMainItem, TalksMainListTmpl, TalkEmpty, Communicator ) {

		/* Return a CompositeView class definition */
		return Backbone.Marionette.CompositeView.extend({
		
			initialize: function() {
				console.log("initialize a TalksMainList CompositeView");

				this.listenTo( this.collection, "sort reset", this.render,  this );
			},

			className: 'talks-mainlist',
			
	    	itemView: TalkMainItem,

	    	emptyView: TalkEmpty,
	    	
	    	template: {
				type: 'handlebars',
				template: TalksMainListTmpl
			},

			itemViewOptions: function() {
				return {
					displayModControls: this.model.get("_mine")
				};
			},
	    	
	    	/* ui selector cache */
	    	ui: {},

	    	/* where are we appending the items views */
	    	itemViewContainer: "tbody",

			/* Ui events hash */
			events: {
				"click .talk-header": "handleSortAction",
				"click .talk-all": "handleAllTalks"
			},

			/* on render callback */
			onRender: function() {},

			handleSortAction: function( e ){
				e.preventDefault();

				this.collection.comparatorKey = $( e.currentTarget ).data("key");
				this.collection.sort();
			},

			handleAllTalks: function() {
				console.log( "handleAllTalks" );
				Communicator.command.execute( "APP:TALK:ALL" );
			}
		});

	});
}).call( this );
