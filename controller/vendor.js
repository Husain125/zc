var express = require("express");
var router = express.Router();
// var path = require('path');
var multer  = require('multer');
var dateTime = require('node-datetime');

var vendor = require("../model/vendor");

router.post("/", function(req,res){
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['created_at']=formatted;	
	req.body['updated_at']=formatted;	
	vendor.insert(req.body, function(err, result){
		if (err) {
			console.log(err);
		}
		res.send(result);
	});	
});

router.get("/", function(req,res){

	vendor.find(function(err, result){
		res.send(result);
	});	
	
});

router.put("/deactive", function(req,res){
    // console.log(req.body);

	var carid = req.body.vendor_id;
	delete req.body.vendor_id;
	delete req.body.created_at;
	delete req.body.updated_at;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['updated_at']=formatted;	
	req.body['status']=0;	
	vendor.updateWhere({vendor_id:carid}, req.body,function(err, result){
		vendor.findbyid(carid,function(err, result){
			console.log(result);
			res.send(result);
		});

        // console.log(result);	
	});	
	
});

router.put("/active", function(req,res){
    // console.log(req.body);

	var carid = req.body.vendor_id;
	delete req.body.vendor_id;
	delete req.body.created_at;
	delete req.body.updated_at;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['updated_at']=formatted;	
	req.body['status']=1;	
	console.log(req.body);
	vendor.updateWhere({vendor_id:carid},req.body, function(err, result){
		vendor.findbyid(carid,function(err, result){
			console.log(result);
			res.send(result);
		});
	});	
	
});

router.put("/", function(req,res){
    console.log(req.body);

	var vendorid = req.body.vendor_id;
	delete req.body.vendor_id;
	delete req.body.created_at;
	delete req.body.updated_at;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['updated_at']=formatted;	
	vendor.updateWhere({vendor_id:vendorid}, req.body, function(err, result){
		vendor.find(function(err, result){
			if (err) {
				console.log(err)
			}
            res.send(result);
        });
        // console.log(result);	
	});	
	
});

router.delete("/", function(req,res){

	
	vendor.delete(req.query.id, function(err, result){
		res.send(result);
	});	
	
});





module.exports=router;