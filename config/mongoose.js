var mongoose = require('mongoose');
var config = require('../config');

module.exports = function(){

 	var db = mongoose.connect(config.db); // connect mongoose db

 	require('../Server/models/user');

 	return db;

 }