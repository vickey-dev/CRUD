var express = require('express');
var bodyParser =require('body-parser');
var app=express();
var mongoose =require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var db=mongoose.connection;
var MongoClient = require('mongodb').MongoClient;
var Schema =mongoose.Schema;
var userSchema = new Schema({ name: String, details: String,email: String , password:String ,phone:String});
var user =mongoose.model('user', userSchema);
var dburl='mongodb://localhost:27017/login';
mongoose.Promise= global.Promise;


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.listen(8000,function(){ console.log("sever is listening to port 8000"); })

var con=mongoose.connect(dburl,{ useMongoClient:true });

db.on('error',function()
{
    console.log('could not connect to the database.Exiting now...');
    process.exit();
})

db.once('open',function(){  console.log("Successfully conncted to the database") })


app.get('/',function(req,res){ res.json({"message":"Welcome to user login"}) });

//user login to get the deatils about him/her
app.post('/login',function(req,res)
{
	user.findOne({email: req.body.logemail
	},function(err,user){
		if(err) throw  err;
		//IF user not found
		if(!user)  
		{
			res.send({success:false,msg:'Authentication failed.User not found'});
		}else if(user){
		//match the password with user entered password
            if(user.password == req.body.logpassword)
            {
                res.json(user)
            }
            //if entered password is wrong
            else
        	{
        		res.send({success:false,msg:'Authentication failed,Wrong password'})
        	}
		}
	})
})

//to GET all the user details except password
app.get('/users',function(req,res)
{
  	user.find({},{password:false},function(err,user)
	{
		
		res.send(user);
	})
})

//to create a new user
app.post('/user',function(req,res)
{
	var new_user = new user(req.body);
    new_user.save(function(err, user) 
    {
     
      res.json(user);
})

})
//to delete an user
app.delete('/user/:usersid',function(req,res)
{    
	var id=req.params.usersid
	user.deleteOne({
		_id: ObjectId(id)
	},function(err,task){
		if(err) res.send(err);
		res.json({message:'user Successfully deleted'})
	})
})    

    

app.put('/user',function(req,res)
{
	var id=req.body.userId;
	user.findOneAndUpdate({_id:ObjectId(id)},req.body,function(err,result){
      	res.send("user data updated");
	})
})