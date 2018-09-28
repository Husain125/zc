var con = require('../config/connect');

module.exports.findwhere=function(obj,cb){
    con.connect(function(err){
        var que = "SELECT * FROM admin WHERE ";
		var counter=1;
		for(var k in obj){
			if(counter==1)
			{
				que += k+"= '"+obj[k]+"'";
			}
			else
			{
				que += " AND "+k+"= '"+obj[k]+"' ";

			}
			counter++;
		}


		// console.log(que);
		con.query(que, cb);
    });
}
