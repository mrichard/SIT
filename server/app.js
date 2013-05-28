'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var baucis = require('baucis');
var faye = require('faye');
var socketIO = require('socket.io');
var mongoose = require('mongoose');


// start mongoose
mongoose.connect('mongodb://localhost/sit');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

	console.log("Mongo connection open");

	// define talks schema for SIT talk proposals
    var talksSchema = new mongoose.Schema({
        title: String,
        description: String,
        createdBy: String,
        createdDate: { type: Date, default: Date.now },
        comments: [{ body: String, date: Date, createdBy: String }],
        meta: {
            votes: Number
        }
    });

    //define Talks model
    var Talk = mongoose.model( 'talk', talksSchema );

    /* BAUCIS */
    baucis.rest({
        singular: 'talk'
    });


	// init express
	var app = express();

	app.configure(function(){
	    app.set('port', 9000);

	    app.set('view engine', 'handlebars');
	    app.set('views', __dirname + '../app/scripts/views');
	});

	// set up Baucis routes
    app.use('/api/v1', baucis());

	// set logging
	app.use(function(req, res, next){
	  console.log('%s %s', req.method, req.url);
	  next();
	});

	// mount static
	app.use(express.static( path.join( __dirname, '../app') ));
	app.use(express.static( path.join( __dirname, '../.tmp') ));


	// route index.html
	app.get('/', function(req, res){
	  res.sendfile( path.join( __dirname, '../app/index.html' ) );
	});

	// start server
	http.createServer(app).listen(app.get('port'), function(){
	    console.log('Express App started!');
	    console.log( app.routes );
	});

});


