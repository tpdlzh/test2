var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
var config = require('../config');
var validator = require('express-validator');
var jwt = require('jsonwebtoken');


 module.exports = function()
 {
 	 var app = express();
 	 app.use(bodyParser.json());
 	 app.use(bodyParser.urlencoded({extended:true}));
 	 app.use(validator());
 
		app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
		}));

 	 app.use(flash());

 	 require('../Server/routes/users.routes')(app);
 	 require('../Server/routes/verify_email_routes')(app);


 	 app.use(express.static('./public'));

 	 return app;
 }
