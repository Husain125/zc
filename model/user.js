var con = require('../config/connect');

module.exports.findall=function(cb){
    con.connect(function(err){
        if (err) {
            console.log(err);
        }
        var que = "SELECT * FROM user ";
        con.query(que, cb);
    });
}
module.exports.updateWhere=function(where, obj , cb){
    var que = "UPDATE user SET ";
    var counter=1;
    for(var k in obj){
        if(counter==1){
            que += k+" = '"+obj[k]+"'"
            
        }
        else{
        que += ", "+k+" = '"+obj[k]+"'"
            
        }
        counter++;
    }
    var key = Object.keys(where);
    que += " WHERE "+key[0]+" = '"+where[key[0]]+"'";
    console.log(que);
    con.connect(function(err){
        if (err) {console.log(err);}
        con.query(que, cb);
    });
}
module.exports.findbyid=function(obj,cb){
    con.connect(function(err){
        var que = "SELECT * FROM user WHERE user_id="+obj;
        con.query(que, cb);
    });
}
module.exports.insert=function(obj,cb){
    con.connect(function(err){
        var que = "INSERT INTO user (user_name, email_id, mobile_number, gender, address, profile_image,latitude,longitude,created_at, updated_at) VALUES ('"+obj.user_name+"','"+obj.email_id+"','"+obj.mobile_number+"','"+obj.gender+"','"+obj.address+"','','','','"+obj.created_at+"','"+obj.updated_at+"')"
        console.log(que);
        con.query(que, cb);
    });
}