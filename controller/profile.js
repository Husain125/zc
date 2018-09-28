//require files--------------------->
var express = require("express");
var router = express.Router();
var dateTime = require('node-datetime');
var cm = require("../model/comman_model.js");

router.post('/', function(req, res){
    cm.getallDataWhere('admin', req.body, function(err, result){
        if (err) {
            console.log(err)
        }
        var result = JSON.parse(JSON.stringify(result[0]));
        res.send(result);
    })
});

router.put('/', function(req, res){
	id = req.body.id;
	delete req.body.id;
	delete req.body.created_at;
	delete req.body.updated_at;
	delete req.body.status;
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    req.body['updated_at']=formatted; 

    cm.update('admin',{id : id}, req.body, function(err, result){
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
});
router.put('/change_pass', function(req, res){
    id = req.body.id;
    delete req.body.id;
    delete req.body.oldpass;
    delete req.body.confirm_password;
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    req.body['updated_at']=formatted; 

    cm.update('admin',{id : id}, req.body, function(err, result){
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
});

module.exports=router;