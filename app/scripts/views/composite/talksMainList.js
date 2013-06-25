(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'views/item/talkMainItem',
		'hbs!tmpl/composite/talksMainList_tmpl',
		'views/item/talkEmpty'
	],
	function( Backbone, TalkMainItem, TalksMainListTmpl, TalkEmpty ) {

		/* Return a CompositeView class definition */
		return Backbone.Marionette.CompositeView.extend({
		
			initialize: function() {
				console.log("initialize a TalksMainList CompositeView");

				this.listenTo( this.collection, "sort", this.render,  this );
			},

			className: 'talks-mainlist',
			
	    	itemView: TalkMainItem,

	    	emptyView: TalkEmpty,
	    	
	    	template: {
				type: 'handlebars',
				template: TalksMainListTmpl
			},
	    	
	    	/* ui selector cache */
	    	ui: {},

	    	/* where are we appending the items views */
	    	itemViewContainer: "tbody",

			/* Ui events hash */
			events: {
				"click .talk-header": "handleSortAction"
			},

			/* on render callback */
			onRender: function() {},

			handleSortAction: function( e ){
				e.preventDefault();

				this.collection.comparatorKey = $( e.currentTarget ).data("key");
				this.collection.sort();
			}
		});

	});
}).call( this );
