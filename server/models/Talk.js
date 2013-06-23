'use strict';

var mongoose = require('mongoose');


// define talks schema for SIT talk proposals
var TalkSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: {
    	id: mongoose.Schema.Types.ObjectId,
    	name: String
    },
    createdDate: { type: Date, default: Date.now },
    comments: [{ 
        body: String, 
        date: Date, 
        createdBy: String 
    }],
    votes: { type: Number, default: 0 }
});

var Talk = mongoose.model( 'talk', TalkSchema );

module.exports =  {
	Talk: Talk
};
