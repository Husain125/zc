var express = require("express");
var router = express.Router();
var moment = require("moment");
var date = require('node-datetime');
// router.use(moment());

var bookcar = require("../model/booking");
var cm = require("../model/booking");

router.post("/", function(req,res){
    var myDate = new Date(req.body.from); // Your timezone!
    var date1 = myDate.getTime()/1000.0;
    var myDate1 = new Date(req.body.to); // Your timezone!
    var date2 = myDate1.getTime()/1000.0;

    req.body[date1]=date1
    req.body[date2]=date2
    //convert epoch time to human redabale
    var dat1 = moment.unix(date1).format('YYYY-MM-DD HH:mm:ss');
    var dat2 = moment.unix(date2).format('YYYY-MM-DD HH:mm:ss');

    //give hours from date & time
    var date1 = moment(dat1,"YYYY-MM-DD HH:mm:ss"); 
    var date2 = moment(dat2,"YYYY-MM-DD HH:mm:ss");

    var duration = moment.duration(date2.diff(date1));

    var hours = duration.asHours();
    // console.log(hours);

    bookcar.getallvehicle(function(err, result){

        result = JSON.parse(JSON.stringify(result));

        result.forEach(function(result) {
            var base_km=5
            var data = result;
            if(hours>data.price_inclued_hour){
                var price_12_below = data.price_inclued_hour * data.base_price_h;
                var extra_hour = hours - data.price_inclued_hour;
                var price_12_above = extra_hour * (data.base_price_h + data.extra_price);

                var final_km = base_km * hours;
                var final_price = (price_12_below  + price_12_above);

                var km_basic = Math.round(final_km, 0);
                var price_basic = Math.round(final_price, 0);

                var dis_two=100-data.discount_2times;
                var km_silver = Math.round(final_km*2, 0);
                var price_silver = Math.round(((final_price*2)*dis_two/100), 0) ;

                var dis_four=100-data.discount_4times;
                var km_gold = Math.round(final_km*4, 0);
                var price_gold = Math.round(((final_price*4)*dis_four/100), 0) ;

                result.km_basic=km_basic;
                result.price_basic=price_basic;
                result.km_silver=km_silver;
                result.price_silver=price_silver;
                result.km_gold=km_gold;
                result.price_gold=price_gold;
            }
            else{
                var final_km = base_km * hours;
                var final_price = hours * data.base_price_h;

                var km_basic = Math.round(final_km, 0);
                var price_basic = Math.round(final_price, 0);

                var dis_two=100-data.discount_2times;//80
                var km_silver = Math.round(final_km*2, 0);
                var price_silver = Math.round(((final_price*2)*dis_two/100), 0);

                var dis_four=100-data.discount_4times;
                var km_gold = Math.round(final_km*4, 0);
                var price_gold = Math.round(((final_price*4)*dis_four/100), 0);

                result.km_basic=km_basic;
                result.price_basic=price_basic;
                result.km_silver=km_silver;
                result.price_silver=price_silver;
                result.km_gold=km_gold;
                result.price_gold=price_gold;
            }
        });
        res.send(result); 
    });
});
router.post("/book", function(req,res){
    console.log(req.body);
    var myDate = new Date(req.body.from); // Your timezone!
    var date1 = myDate.getTime()/1000.0;
    var myDate1 = new Date(req.body.to); // Your timezone!
    var date2 = myDate1.getTime()/1000.0;
    req.body['from']=date1;
    req.body['to']=date2;
	bookcar.insert(req.body, function(err, result){
          if (err) {
            console.log(err)
        }
	});	
});
router.post("/getcar", function(req, res){
 
    var vehicle_id = req.body.vehicle_id;
    bookcar.getvehicle("vehicle_id="+vehicle_id, function(err, result){
        if (err) {
            console.log(err)
        }
        var result = JSON.parse(JSON.stringify(result[0]));
        res.send(result);
    })

});
module.exports=router;