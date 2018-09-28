//require files--------------------->
var express = require("express");
var router = express.Router();
var dateTime = require('node-datetime');
var user = require("../model/user");
var cm = require("../model/comman_model.js");


//post Method ---------------------->
router.post('/', function(req, res){
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    req.body['profile_image']="";
    req.body['created_at']=formatted;
    req.body['updated_at']=formatted;
    cm.getallDataWhere('user',{email_id: req.body.email_id}, function(err, result){
        if (result.length==0) {
            cm.insert('user',req.body, function(err, result){
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        }else{
            res.send("012");
        }
    })
});

//post Get Funcation ------------------------->
router.get("/", function(req,res){

    user.findall(function(err, result){
        if (err) {
            console.log(err);
        }
        var result = JSON.parse(JSON.stringify(result));
        res.send(result);
    });
});

router.put("/deactive", function(req,res){
    var user_id = req.body.user_id;
    delete req.body.User_id;
    delete req.body.created_at;
    delete req.body.updated_at;
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    req.body['updated_at']=formatted;   
    req.body['status']=0;   
    user.updateWhere({user_id:user_id}, req.body,function(err, result){
        user.findbyid(user_id,function(err, result){
            res.send(result);
        });
    }); 
});
router.put("/active", function(req,res){
    // console.log(req.body);
    var user_id = req.body.user_id;
    delete req.body.User_id;
    delete req.body.created_at;
    delete req.body.updated_at;
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    req.body['updated_at']=formatted;   
    req.body['status']=1;   
    user.updateWhere({user_id:user_id}, req.body,function(err, result){
        user.findbyid(user_id,function(err, result){
            result['code']='012'
            res.send(result);
        });
    });
});
router.put("/update", function(req,res){
    console.log(req.body);
    var user_id = req.body.user_id;
    delete req.body.user_id;
    delete req.body.created_at;
    delete req.body.updated_at;
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    req.body['updated_at']=formatted;   
    console.log(req.body);
    // req.body['status']=1;   
    cm.update('user',{user_id:user_id}, req.body,function(err, result){
        cm.getallDataWhere('user',{user_id:user_id},function(err, result){
            console.log(result);
            result=JSON.parse(JSON.stringify(result[0]));
            res.send(result);
        });
    });
});

module.exports=router;