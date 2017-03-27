// set up =========================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');         // mongoose for mongodb
var morgan = require('morgan');				// log requests to the console (express4)

// configuration ==================================================
var database = require('./config/database');
mongoose.connect(database.url, function(err) {
     if (err) return console.error(err);
}); 
app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev')); 

// routes =========================================================
require('./app/routes')(app);

var port = process.env.PORT || CONFIG.port || 6000;
app.listen(port);
console.log("App listening on port " + port);