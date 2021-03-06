'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');

var faye = require('faye');

var dbSetup = require('./db/setup');
var config = require('./config/config');

var account = require('./routes/Account');
var talk = require('./routes/Talk');

var socket = require('./socketio/main');

var routeRoot = config.routeRoot;

/*** APP ***/
var app = express();

app.configure(function(){
    app.set('port', 9000);

    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../app/scripts/views');
});

// TEMP APPLIATION STORE for logged in users - should be replaced by redis - CLEANUP
app.locals({
  loggedInUsers: []
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

// account
account = account({ app: app });
app.post( '/api/v1/login', account.login );
app.put( '/api/v1/login', account.login );
app.put( '/api/v1/logout', account.logout );
app.post( '/api/v1/register', account.register );
app.get( '/api/v1/authenticated', account.authenticated );
app.post( '/api/v1/forgotpw', account.forgotpw );

// talk
talk.initRoutes( app );


/*** START SERVER ***/
var createServer = function() {
  var server = http.createServer(app);

  socket = socket({ app: app });
  socket.init( server );

	server.listen(app.get('port'), function(){
		console.log('Express App started!');
	});
};

dbSetup.init( createServer );




