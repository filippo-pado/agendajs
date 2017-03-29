'use strict';
// set up =========================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');         // mongoose for mongodb
var morgan = require('morgan');				// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)

// configuration ==================================================
require('dotenv').config();
var database = require('./config/database');
mongoose.connect(database.url, function(err) {
     if (err) return console.error(err);
});
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev')); 

// routes =========================================================
require('./app/routes/routes')(app);

// start ==========================================================
var port = process.env.PORT || 6000;
app.listen(port);
console.log("App listening on port " + port);

module.exports = app; // for testing