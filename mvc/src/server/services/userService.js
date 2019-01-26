"use strict";
const userModel = require('../models/userModel.js');
var userMaster = {};

userMaster.findOne = (query)=>{
	return new Promise ((resolve,reject)=>
	{
		try{
			userModel.findOne(query,function(err,user){
				if(err || !user){
					return reject(err);
				}else{
					resolve(user);
				}
			});
		}catch(err){
			return reject(err);
		}
	})
};
userMaster.find =(query)=>{
	return new Promise((resolve,reject)=>
	{
		try{
			userModel.find({},query,function(err,user){
				if(err||!user){
					return reject(err);
				}else{
					resolve(user);
				}
			});
		}catch(err){
			return reject(err);
		}
	})
};
userMaster.save=(query)=>{
	var new_user = new userModel(query);
	return new Promise((resolve,reject)=>
	{
		try{
			new_user.save(function(err,user){
				if(!user || err)
				{
					return reject(err);
				}
				else{
					resolve(user);
				}
			})
		}catch(err){
			return reject(err);
		}
	})
};
userMaster.deleteOne=(query)=>{
	return new Promise((resolve,reject)=>
	{
	  try{
	  	userModel.deleteOne(query,function(err,user){
	  		if(err)
	  			return reject(err);
	  		else
	  			resolve(user);
	  	})
	  }catch(err){
	  	return reject(err);
	  }
	})
};
userMaster.findOneAndUpdate=(query,body)=>{
	return new Promise((resolve,reject)=>
	{
		try{
			userModel.findOneAndUpdate(query,body,function(err,user){
				if(err)
					return reject(err);
				else
					resolve(user);
			})
		}catch(err){
			return reject(err);
		}
	})
}


module.exports = userMaster;