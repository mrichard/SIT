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

/*** APP ***/
var app = express();

app.configure(function(){
    app.set('port', 9000);

    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../app/scripts/views');
});


/*** MIDDLEWARE ***/
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});
app.use(express.static( path.join( __dirname, '../app') ));
app.use(express.static( path.join( __dirname, '../.tmp') ));
app.use( express.bodyParser() );
app.use( express.cookieParser() );
app.use( express.session({ secret: '121212121212' }) );


/*** ROUTES ***/
app.get('/', function(req, res){
  res.sendfile( path.join( __dirname, '../app/index.html' ) );
});

app.post( '/api/v1/login', account.login );
app.post( '/api/v1/logout', account.logout );
app.post( '/api/v1/register', account.register );
app.get( '/api/v1/authenticated', account.authenticated );
app.post( '/api/v1/forgotpw', account.forgotpw );


/*** START SERVER ***/
var createServer = function() {
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express App started!');
		console.log( app.routes );
	});
};

dbSetup.init( createServer );




