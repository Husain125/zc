var con = require('../config/connect');

module.exports.find=function(cb){
    con.connect(function(err){
        var que = "SELECT * FROM vendor"

		// console.log(que);
		con.query(que, cb);
    });
}

module.exports.updateWhere=function(where, obj, cb){
	console.log(obj)
	var que = "UPDATE vendor SET ";
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

module.exports.updatestatus=function(where, cb){
	var que = "UPDATE vendor SET status = 0 WHERE vendor_id="+where;
    // console.log(que);
    con.connect(function(err){
		con.query(que, cb);
    });
}

module.exports.updatestatus1=function(where, cb){
	var que = "UPDATE vendor SET status = 1 WHERE vendor_id="+where;
    // console.log(que);
    con.connect(function(err){
		con.query(que, cb);
    });
}

module.exports.findbyid=function(obj,cb){
    con.connect(function(err){
        var que = "SELECT * FROM vendor WHERE vendor_id="+obj;
		con.query(que, cb);
    });
}

module.exports.delete=function(obj, cb){
    con.connect(function(err){
        var que ="DELETE FROM vendor WHERE vendor_id="+obj;
        con.query(que,cb);
    });
}
module.exports.insert=function(obj, cb){
	con.connect(function(err){
		var que = "INSERT INTO vendor (vendor_name,address,contact_number,gender,profile_image,email_id,created_at,updated_at) VALUES ('"+obj.vendor_name+"', '"+obj.address+"', '"+obj.contact_number+"','"+obj.gender+"','"+obj.profile_image+"','"+obj.email_id+"','"+obj.created_at+"','"+obj.updated_at+"')";
    
       // console.log(que);
       
        
        con.query(que,cb);
	});
}