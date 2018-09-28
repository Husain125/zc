var con = require('../config/connect');

module.exports.getSinglerow=function(table,where, cb)
{
    con.connect(function(err){
        if (err) {
            console.log(err);
        }
        var que = "SELECT * FROM "+table+" WHERE "+where;
        // console.log(que);
        con.query(que, cb);
    });
}

module.exports.getallData=function(table,cb)
{
    var que = "SELECT * FROM "+table;
    con.query(que, cb);
}

module.exports.getallDataWhere=function(table,obj,cb)
{
    con.connect(function(err){
    var que = "SELECT * FROM  "+table+" WHERE ";
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
    con.query(que, cb);
    })
}

module.exports.insert=function(table, obj, cb)
{
    con.connect(function(err){
        var que = "INSERT INTO "+table+" (";
        var counter = 1;
        for(var k in obj){
            if (counter==1) {
                que += k
            }
            else{
                que += ", "+k
            }
            counter++;
        }   
        que += ") VALUES ( ";
        var counter = 1;
            for (var l in obj) {
                if (counter==1) {
                    que += "'"+obj[l]+"'"
                }else{
                    que += ", "+"'"+obj[l]+"'"
                }       
                counter++;
            }
        que += ")";
        con.query(que, cb);
    });
}

module.exports.update=function(table, where, obj, cb)
{
    var que = "UPDATE "+table+" SET ";
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
    con.query(que, cb);
}
module.exports.getadmin=function(table, where,cb)
{
    var que = "SELECT * FROM "+table+"WHERE "+where;
    con.query(que, cb) 
}