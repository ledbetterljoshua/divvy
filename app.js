var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	config = require('./config'),
	fs = require('fs'),
	request = require('request'),
	cheerio = require('cheerio'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	session = require('express-session'),
	flash = require('connect-flash'),
	morgan = require('morgan'),
	bodyParser = require('body-parser');

	router = express.Router();

	// required for passport
	app.use(session({ secret: 'ledbetterljoshuarox' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

	require('./config/passport')(passport, flash);

	//require('./controllers/api/posts')(app, router, bodyParser);
	require('./controllers/api/comments')(app, router, bodyParser);
	require('./controllers/api/posts')(app, router, bodyParser);
	require('./controllers/api/groups')(app, router, bodyParser);
	require('./controllers/api/users')(app, passport, flash);
	require('./controllers/mainRoute')(app, flash);
	require('./controllers/api/urls')(app, router, bodyParser, request, cheerio);

	app.use(morgan('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser()); // get information from html forms
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());


var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/views'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());

app.use('/api', router);

app.listen(port);
console.log("listening")