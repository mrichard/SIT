'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var baucis = require('baucis');
var faye = require('faye');
var socketIO = require('socket.io');

var dbSetup = require('./db/setup');
var config = require('./config/config');
var account = require('./routes/Account');

var routeRoot = config.routeRoot;

// init express
var app = express();

app.configure(function(){
    app.set('port', 9000);

    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../app/scripts/views');
});

// set logging
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// mount static
app.use(express.static( path.join( __dirname, '../app') ));
app.use(express.static( path.join( __dirname, '../.tmp') ));

//body parser
app.use( express.bodyParser() );

// route index.html
app.get('/', function(req, res){
  res.sendfile( path.join( __dirname, '../app/index.html' ) );
});

// Routes
app.post( path.join('/api/v1/login'), account.login );

// start server
var createServer = function() {
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express App started!');
		console.log( app.routes );
	});
};

dbSetup.init( createServer );




