var express = require('express');
var bodyParser =require('body-parser');
var app=express();
var mongoose =require('mongoose');
var db=mongoose.connection;
var Schema =mongoose.Schema;

var userSchema = new Schema({ name: String, details: String,email: String , password:String });
var user =mongoose.model('user', userSchema);


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


var dburl='mongodb://localhost:27017/login';

 
app.listen(8000,function()
{
	console.log("sever is listening to port 8000");
})



var con=mongoose.connect(dburl,{
    useMongoClient:true 
});

				db.on('error',function()
				{
				    console.log('could not connect to the database.Exiting now...');
				    process.exit();
				})

				db.once('open',function()
				{
				    console.log("Successfully conncted to the database")
				})


app.get('/',function(req,res)
{
    res.json({"message":"Welcome to user login"})
    
});


app.post('/profile',function(req,res)
{
	console.log("----"+req.body.logemail);
	user.findOne({
		email: req.body.logemail

	},function(err,user){
		if(err) throw  err;
		//IF user not found
		if(!user)  
		{
			res.send({success:false,msg:'Authentication failed.User not found'});
		}
			else if(user){
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


	}
	)
})








   