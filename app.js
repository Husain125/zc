var express= require('express');
var app= express();
var multer = require('multer');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var body= require('body-parser');
var cache= require('nocache');

app.use(body());
app.use(cookieParser());
app.use(session({ secret : "SAMYOTECH"}));
app.use(flash());
app.use(cache());

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.use(function(req, res, next){
	res.locals.session = req.session;
	next();
});

app.get('/home',function(req,res){
    res.sendFile(__dirname+'/views/index.html');
});

app.use(require("./config/routes"));

var path = 3000;

app.listen(path, function(){
    console.log('server runing on port '+path);
});