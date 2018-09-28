var express= require('express');
var routes=express.Router();

routes.use("/",require("../controller/login"));
routes.use("/vendor",require("../controller/vendor"));
routes.use("/car",require("../controller/car"));
routes.use("/booking",require("../controller/booking"));
routes.use("/user",require("../controller/user"));
routes.use("/manager",require("../controller/manager"));
routes.use("/profile",require("../controller/profile"));

module.exports= routes;