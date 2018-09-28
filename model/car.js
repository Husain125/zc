// model, brand, picture, seater, lati,longi, address, base_price_h, extra_price, price_inclued_hour, deposite_amt, discount_2times, discount_4times, fuel_include, tax_include, insurance_include, price_per_km, status, city, created_at, updated_at
var con = require('../config/connect');

module.exports.find=function(cb){
    con.connect(function(err){
        var que = "SELECT * FROM vendor"

		// console.log(que);
		con.query(que, cb);
    });
}
module.exports.findall=function(cb){
    con.connect(function(err){
        var que = "SELECT * FROM car_vehicle"

        // console.log(que);
        con.query(que, cb);
    });
}
module.exports.findVehicle=function(cb){
    con.connect(function(err){
        var que = "SELECT * FROM car_vehicle INNER JOIN vendor ON vendor.vendor_id = car_vehicle.vendor_id INNER JOIN modal ON modal.id = car_vehicle.modal_id INNER JOIN brand ON brand.id = car_vehicle.brand_id"
		con.query(que, cb);
    });
}

module.exports.insert=function(obj, cb){
	con.connect(function(err){
        if(err){
            console.log(err);
        }
		var que = "INSERT INTO car_vehicle (model,brand,picture,seater,lati,longi,address,base_price_h,extra_price,price_inclued_hour,deposite_amt,discount_2times,discount_4times,fuel_include,tax_include,insurance_include,price_per_km,city,created_at,updated_at,Vendor_id) VALUES ('"+obj.model+"', '"+obj.brand+"', '"+obj.picture+"','"+obj.seater+"','"+obj.lati+"','"+obj.longi+"','"+obj.address+"','"+obj.base_price_h+"','"+obj.extra_price+"','"+obj.price_inclued_hour+"','"+obj.deposite_amt+"','"+obj.discount_2times+"','"+obj.discount_4times+"','"+obj.fuel_include+"','"+obj.tax_include+"','"+obj.insurance_include+"','"+obj.price_per_km+"','"+obj.city+"','"+obj.created_at+"','"+obj.updated_at+"','"+obj.vendor_id+"')";
        con.query(que,cb);
	});
}

module.exports.updateWhere=function(where, obj, cb){

	var que = "UPDATE car_vehicle SET model = '"+obj.model+"', brand = '"+obj.brand+"', picture = '"+obj.picture+"', seater = '"+obj.seater+"', lati = '"+obj.lati+"', longi = '"+obj.longi+"', address = '"+obj.address+"', base_price_h = '"+obj.base_price_h+"', extra_price = '"+obj.extra_price+"', price_inclued_hour = '"+obj.price_inclued_hour+"', deposite_amt = '"+obj.deposite_amt+"', discount_2times = '"+obj.discount_2times+"', discount_4times = '"+obj.discount_4times+"', fuel_include = '"+obj.fuel_include+"', tax_include = '"+obj.tax_include+"', insurance_include = '"+obj.insurance_include+"', price_per_km = '"+obj.price_per_km+"', city = '"+obj.city+"', updated_at = CURRENT_TIMESTAMP, Vendor_id = '"+obj.Vendor_id+"' WHERE vehicle_id ="+where;
    console.log(que);
    con.connect(function(err){
		con.query(que, cb);
    });
}



module.exports.updatestatus=function(where, cb){
	var que = "UPDATE car_vehicle SET status = 0 WHERE vehicle_id="+where;
    // console.log(que);
    con.connect(function(err){
		con.query(que, cb);
    });
}

module.exports.updatestatus1=function(where, cb){
	var que = "UPDATE car_vehicle SET status = 1 WHERE vehicle_id="+where;
    // console.log(que);
    con.connect(function(err){
		con.query(que, cb);
    });
}

module.exports.findbyid=function(obj,cb){
    con.connect(function(err){
        var que = "SELECT * FROM car_vehicle WHERE vehicle_id="+obj;

		// console.log(que);
		con.query(que, cb);
    });
}

module.exports.delete=function(obj, cb){
    con.connect(function(err){
        var que ="DELETE FROM car_vehicle WHERE vehicle_id="+obj;
        con.query(que,cb);
    });
}


// module.exports.updateWhere=function(where, obj, cb){
// 	var que = "UPDATE car_vehicle SET ";
// 	var counter=1;
// 	for(var k in obj){
// 		if(counter==1){
// 			que += k+" = '"+obj[k]+"'"
			
// 		}
// 		else{
// 		que += ", "+k+" = '"+obj[k]+"'"
			
// 		}
// 		counter++;
// 	}
// 	var key = Object.keys(where);
// 	que += " WHERE "+key[0]+" = '"+where[key[0]]+"'";
//     console.log(que);
//     con.connect(function(err){
// 		con.query(que, cb);
//     });
// }