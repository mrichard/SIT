'use strict';


var mongoose = require('mongoose');

module.exports = function() {

	// define talks schema for SIT talk proposals
    var TalkSchema = new mongoose.Schema({
        title: String,
        description: String,
        createdBy: String,
        createdDate: { type: Date, default: Date.now },
        comments: [{ body: String, date: Date, createdBy: String }],
        meta: {
            votes: Number
        }
    });

	var Talk = mongoose.model( 'talk', TalkSchema );

	return {
		Talk: Talk
	};
};