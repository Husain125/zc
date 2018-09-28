// model, brand, picture, seater, lati,longi, address, base_price_h, extra_price, price_inclued_hour, deposite_amt, discount_2times, discount_4times, fuel_include, tax_include, insurance_include, price_per_km, status, city, created_at, updated_at
var con = require('../config/connect');


module.exports.findVehicle=function(obj,obj2,cb){
    console.log(obj);
    console.log(obj2);
    con.connect(function(err){
        var que = "SELECT * FROM bookcar WHERE date_time_from >= '"+obj+"' AND date_time_to <='"+obj2+"'";
        con.query(que, cb);
    });
}
module.exports.getvehicle=function(obj,cb){
    var que = "SELECT * FROM car_vehicle WHERE "+obj;
    con.query(que, cb);
    
}
module.exports.getallvehicle=function(cb){
    var que = "SELECT * FROM car_vehicle";
    con.query(que, cb);
}
module.exports.insert=function(obj, cb){
    console.log(obj);
	con.connect(function(err){
        if (err) {
            console.log(err)
        }
		var que = "INSERT INTO bookcar (vehicle_id,address_from,address_to,km_free,price,package,date_time_from,date_time_to,user_id) VALUES ('"+obj.vehicle_id+"', '"+obj.address_from+"', '"+obj.address_to+"','"+obj.km+"','"+obj.total+"','1','"+obj.from+"','"+obj.to+"','1')";
        console.log(que);
        con.query(que,cb);
	});
}