var express= require('express');
var routes=express.Router();
var user=require('../model/admin');

routes.get("/", function(req, res){
	var pageData = { title : "Login Page", msg : req.flash('msg')};
	res.render("login", pageData);
});

routes.post('/', function(req,res){
    var u =req.body.username;
    var p =req.body.password;
    user.findwhere({ username : u}, function(err, result){
        if(result.length==1)
		{
			var data = JSON.parse(JSON.stringify(result[0]));
			if(data.password == p)
			{
				req.session.name = data.username;
				req.session.uid = data.id;
				req.session.is_user_logged_in = true;
				res.redirect("/home");
			}
			else
			{
				req.flash("msg", "This password is incorrect");
				res.redirect("/");
			}
		}
		else
		{
			req.flash("msg", "This username and password is incorrect");
			res.redirect("/");
		}
    
    });
});
routes.get('/getdata', function(req,res){
    
    var a = req.session.uid;
    
    res.send({"id":a});
});
    

module.exports= routes;