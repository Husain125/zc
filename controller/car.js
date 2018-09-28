var express = require("express");
var router = express.Router(); 

var car = require("../model/car");
var cm = require("../model/comman_model");
var vendor = require("../model/vendor");
var dateTime = require('node-datetime');


// Get Method Start ----------->
router.get("/", function(req,res){
	cm.getallData('vendor',function(err, result){
		res.send(result);
	});	
});


// Not done !!!!!!!!!!!!!!!!!
router.get("/view", function(req,res){
	car.findVehicle(function(err, result){
		res.send(result);
	});
});
// Not done !!!!!!!!!!!!!!!!!



router.get("/getbrand", function(req,res){
	cm.getallData('brand',function(err, result){
		res.send(result);
	});
});

router.get("/getmodal", function(req,res){
	cm.getallData('modal',function(err, result){
		res.send(result);
	});
});
// Get methods end ------>

// Post methods start ---------->
router.post("/", function(req,res){
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['created_at']=formatted;	
	req.body['updated_at']=formatted;	
	cm.insert('car_vehicle', req.body, function(err, result){
		if (err) {
			console.log(err);
		}
		res.send(result);
	})
});

router.post("/addbrand", function(req,res){
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['created_at']=formatted;	
	req.body['updated_at']=formatted;
	cm.getallDataWhere('brand' , {brand_name : req.body.brand_name}, function(err, result){
		if (result.length==0) {
			cm.insert('brand',req.body, function(err, result){
				if (err) {
					console.log(err);
				}
				res.send(result);
			});	
		}else{
			res.send("012")
		}
	})
});

router.post("/addmodel", function(req,res){
	// console.log(req.body);
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['created_at']=formatted;	
	req.body['updated_at']=formatted;
	cm.getallDataWhere('modal' , { modal_name : req.body.modal_name, brand_id : req.body.brand_id}, function(err, result){
		if (result.length==0) {
			cm.insert('modal',req.body, function(err, result){
				if (err) {
					console.log(err);
				}
				res.send(result);
			});	
		}else{
			res.send("012")
		}
	})
});

router.post("/get_brand_id", function(req,res){
	cm.getallDataWhere('brand',req.body,function(err, result){
		result = JSON.parse(JSON.stringify(result[0]));
		res.send(result);
	});
});

router.post("/get_model_id", function(req,res){
	// console.log(req.body);
	cm.getallDataWhere('modal',req.body,function(err, result){
		res.send(result);
	});
});
// Post method end --------->

// Put method start --------->
router.put("/", function(req,res){
	// console.log(req.body);

	var vehicle_id = req.body.vehicle_id;
	delete req.body.vehicle_id;
	delete req.body.vendor_name;
	delete req.body.contact_number;
	delete req.body.gender;
	delete req.body.profile_image;
	delete req.body.email_id;
	delete req.body.id;
	delete req.body.modal_name;
	delete req.body.brand_name;
	delete req.body.brand;
	delete req.body.model;
	delete req.body.created_at;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['updated_at']=formatted;
	cm.update('car_vehicle', {vehicle_id : vehicle_id} ,req.body, function(err, result){
		if (err) {
			console.log(err);
		}
		console.log(result);
		res.send(result);
	});	
});

router.put("/brand_update", function(req,res){
	var id = req.body.id;
	delete req.body.id;
	delete req.body.created_at;
	delete req.body.cstatus;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['updated_at']=formatted;
	cm.update('brand',{id: id},req.body, function(err, result){
		if (err) {
			console.log(err)
		}
		res.send(result);
	});
});

router.put("/deactive", function(req,res){
	var result = {};
	var vehicle_id = req.body.vehicle_id;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	result['updated_at']=formatted;
	result['cstatus']=0;
	console.log(result);
	cm.update('car_vehicle',{vehicle_id : vehicle_id},result,function(err, result){
		if (err) {
			console.log(err)
		}
		console.log(result);
		res.send(result);

	});	
});

router.put("/brand_deactive", function(req,res){
	var id = req.body.id;
	delete req.body.id;
	delete req.body.created_at;
	delete req.body.brand_name;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['updated_at']=formatted;
	req.body['status']=0;
	cm.update('brand',{id: id},req.body, function(err, result){
		if (err) {
			console.log(err)
		}
		res.send(result);
	});
});

router.put("/modal_deactive", function(req,res){
	var id = req.body.id;
	delete req.body.id;
	delete req.body.created_at;
	delete req.body.modal_name;
	delete req.body.brand_id;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['updated_at']=formatted;
	req.body['status']=0;
	cm.update('modal',{id: id},req.body, function(err, result){
		if (err) {
			console.log(err)
		}
		res.send(result);
	});
});		

router.put("/active", function(req,res){
    var result = {};
	var vehicle_id = req.body.vehicle_id;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	result['updated_at']=formatted;
	result['cstatus']=1;
	console.log(result);
	cm.update('car_vehicle',{vehicle_id : vehicle_id},result,function(err, result){
		if (err) {
			console.log(err)
		}
		console.log(result);
		res.send(result);
	});
});

router.put("/brand_active", function(req,res){
    var id = req.body.id;
	delete req.body.id;
	delete req.body.created_at;
	delete req.body.brand_name;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['updated_at']=formatted;
	req.body['status']=1;
	cm.update('brand',{id: id},req.body, function(err, result){
		if (err) {
			console.log(err)
		}
		res.send(result);
	});
});

router.put("/modal_active", function(req,res){
    var id = req.body.id;
	delete req.body.id;
	delete req.body.created_at;
	delete req.body.modal_name;
	delete req.body.brand_id;
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	req.body['updated_at']=formatted;
	req.body['status']=1;
	cm.update('modal',{id: id},req.body, function(err, result){
		if (err) {
			console.log(err)
		}
		res.send(result);
	});
});
// Put method end ------->

module.exports=router;