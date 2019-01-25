const userService = require('../services/userService.js');
//const userModel = require('../models/userModel.js');

var userCtrl ={};

userCtrl.login =(req,res)=>{
	var query ={
		email:req.body.logemail
	};    
	userService.findOne(query).then(result=>{

		if(req.body.logpassword == result.password){
	         res.send({
				success:true,
				data:result
			 });
       }else{
				res.send({
					success:false,
					data:'Authentication failed,Wrong password'
				});
			}	
		},err=>{
		res.send({
			success:false,
			data:'Authentication failed.User not found'});
	});
		
}
userCtrl.get =(req,res)=>{
	var query={
		password:false
	}
	
	userService.find(query).then(result=>{
		if(result.data==[]){
			res.send({
				success:true,
				data:'DB empty'
			})
		}else{
          	
			res.send({
				success:true,
				data:result
            })
		}

	},err=>{
		res.send({
			success:false,
		    data:res    });
	});

}
userCtrl.post=(req,res)=>{
	var query= req.body;

	userService.save(query).then(result=>{
		res.send({
			success:true,
			data:result
		})
	});
}
userCtrl.delete=(req,res)=>{
	var id = req.params.usersid;
	var query={
		_id: id
	}
    userService.deleteOne(query).then(result=>{
		res.send({
			success:true,
			data:'user Successfully deleted'
		})
	});
}
userCtrl.put=(req,res)=>{
	var id =req.body.userId;
	console.log(req.body.userId);
	var query={
		_id:id
	}
	var body = req.body;

	userService.findOneAndUpdate(query,body).then(result=>{
		res.send({
			success:true,
			data:'user data updated'
		})
	});
}


module.exports = userCtrl;