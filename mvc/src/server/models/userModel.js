"use strict";
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
var userSchema = new Schema({ 
	name: String,
	details: String,
	email: String ,
	password:String ,
	phone:String
});
module.exports =mongoose.model('user', userSchema);