'use strict';


var mongoose = require('mongoose');

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

module.exports =  {
	Talk: Talk
};
