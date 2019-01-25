"use strict"

const express = require('express');
const app = express()
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var ObjectId = require('mongodb').ObjectID;

var routes = require('./routes')(app);

//MognoDB connection
var db=mongoose.connection;
var MongoClient = require('mongodb').MongoClient;
var dburl='mongodb://localhost:27017/login';
mongoose.Promise= global.Promise;
const Port =8000;
app.listen(Port,function(){ console.log("sever is listening to port " +Port); })

var con=mongoose.connect(dburl);

db.on('error',function()
{
    console.log('could not connect to the database.Exiting now...');
    process.exit();
})

db.once('open',function(){  console.log("Successfully conncted to the database") })

app.get('/',function(req,res){ res.json({"message":"Welcome to user login"}) });
