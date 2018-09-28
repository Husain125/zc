var express = require("express");
var router = express.Router();

var date = require('node-datetime');

var cm = require("../model/comman_model");

router.post("/", function(req,res){
    var dt = date.create();
    var formatted = dt.format('Y-m-d H:M:S');
    req.body['created_at']=formatted;   
    req.body['updated_at']=formatted;   
    req.body['role']=1;   
    delete req.body['cpass'];
    console.log(req.body);
    var email = req.body['username'];
    cm.getallDataWhere('admin',{username:email},function(err, result){
        if (result.length==0) {
            cm.insert('admin',req.body,function(err, result){
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        }else{
            res.send('012')
        }
    })
});
router.get("/", function(req,res){
    cm.getadmin('admin ','role != 0',function(err, result){

        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});
router.put("/", function(req, res){
    var dt = date.create();
    var formatted = dt.format('Y-m-d H:M:S');
    req.body['updated_at']=formatted; 
    var id = req.body['id'];

    delete req.body['id'];
    delete req.body['created_at'];
    delete req.body['image'];
    delete req.body['status'];
    cm.update('admin',{id:id},req.body,function(err, result){
        if (err) {
            console.log(err)
        }
        res.send(result);
    });
});
router.put('/deactive', function(req, res){
    // console.log(req.body);
    var dt = date.create();
    var formatted = dt.format('Y-m-d H:M:S');
    req.body['updated_at']=formatted; 
    var id = req.body['id'];
    
    delete req.body['id'];
    delete req.body['created_at'];
    delete req.body['image'];
    delete req.body['password'];
    delete req.body['status'];
    delete req.body['name'];
    delete req.body['username'];
    delete req.body['role'];
    req.body['status']=0;
    cm.update('admin',{id:id}, req.body, function(err, result){
        if (err) {
            console.log(err);
        }
        res.send(result);
    }) 
});
router.put('/active', function(req, res){
    var dt = date.create();
    var formatted = dt.format('Y-m-d H:M:S');
    req.body['updated_at']=formatted; 
    var id = req.body['id'];
    
    delete req.body['id'];
    delete req.body['created_at'];
    delete req.body['image'];
    delete req.body['password'];
    delete req.body['status'];
    delete req.body['name'];
    delete req.body['username'];
    delete req.body['role'];
    req.body['status']=1;
    cm.update('admin',{id:id}, req.body, function(err, result){
        if (err) {
            console.log(err);
        }
        res.send(result);
    }) 
});
module.exports=router;