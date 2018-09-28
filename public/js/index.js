// This is angular app , named myApp and with angular dependices 
var app = angular.module("myApp", ['ngRoute','ngStorage','angularjs-datetime-picker','angularUtils.directives.dirPagination']);

// Angular Routing config ------>>

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/views/dashboard.html",
        controller : 'dash'
    })
    .when("/Addvendor", {
        templateUrl : "/views/addvendor.html",
        controller: 'addvendor'
    })
    .when("/Viewvendor", {
        templateUrl : "/views/viewvendor.html",
        controller: 'viewvendor'
    })
    .when("/Addcar", {
        templateUrl : "/views/addcar.html",
        controller: 'addcar'
    })
    .when("/Viewcar", {
        templateUrl : "/views/viewcar.html",
        controller: 'viewcar'
    })
    .when("/Booking", {
        templateUrl : "/views/booking.html",
        controller: 'booking'
    })
    .when("/User", {
        templateUrl : "/views/user.html",
        controller : 'user'
    })
     .when("/Adduser", {
        templateUrl : "/views/adduser.html",
        controller : 'user'
    })
     .when("/abc", {
        templateUrl : "/views/abc.html",
        controller : 'MyCtrl'
    })
     .when("/confirmpage", {
        templateUrl : "/views/confirm_page.html",
        controller : 'booking'
     })
      .when("/Manager", {
        templateUrl : "/views/manager.html",
        controller : 'booking'
     })
      .when("/addmanager", {
        templateUrl : "/views/addmanager.html",
        controller : 'booking'
     })
      .when("/Profile", {
        templateUrl : "/views/profile.html",
        controller : 'profile'
     })
      .when("/Brand", {
        templateUrl : "/views/brand.html",
        controller : 'vehicle_brand'
     })
      .when("/addbrand", {
        templateUrl : "/views/addbrand.html",
        controller : 'vehicle_brand'
     })
      .when("/Modal", {
        templateUrl : "/views/modal.html",
        controller : 'vehicle_modal'
     })
      .when("/addmodal", {
        templateUrl : "/views/addmodal.html",
        controller : 'vehicle_modal'
     })
});

//This Controller is for getting details from nodejs session to angular session
app.controller('dash', function($scope, $http, $window){
    $scope.newData = {};
    $scope.session_data = function(){
        $http({
                method : "GET",
                url : "/getdata"
        }).then(function(res){
            $window.sessionStorage.setItem("Id", res.data.id);
            $scope.newData = $window.sessionStorage.getItem("Id")


        })
    }
});
// This Controller is for vendor viewing
app.controller('viewvendor',function($scope,$http){

    $scope.allData = [];
	$scope.newData = {};

	$scope.getData=function(){

		$http({
			method : "GET",
			url : "vendor"
		}).then(function(res){
			$scope.allData=res.data;
		});
    }

    $scope.add=function(){
        $http({
            method : "PUT",
            url : "vendor",
            data : $scope.newData
        }).then(function(res){
            $scope.getdata();
        });
    }
    $scope.deactive=function(){
        $http({
            method : "PUT",
            url : "vendor/deactive",
            data : $scope.selectedObj
        }).then(function(res){
           $scope.getdata();
        });
    }
    $scope.active=function(){
        $http({
            method : "PUT",
            url : "vendor/active",
            data : $scope.selectedObj
        }).then(function(res){
            $scope.getdata();
        });
    }

	$scope.askUpdate=function(obj){
		angular.copy(obj, $scope.newData);
    }

    $scope.askActive=function(obj){
		$scope.selectedObj=obj;
    }
    
    $scope.askView=function(obj){
		$scope.selectedObj=obj;
	}
});
// This Controller is for add Vendor
app.controller('addvendor',function($scope,$http, $location){

    $scope.newData = {};
    
    $scope.submit=function(){
        $http({
            method : "post",
            url : "vendor",
            data : $scope.newData
        }).then(function () {
            $location.path('/Viewvendor');
        });
    }
});
// This controller is for add Car
app.controller('addcar',function($scope,$http, $location){

    $scope.allData = [];
    $scope.allData1 = [];
    $scope.allData2 = [];
	$scope.newData = {};
    
    $scope.getbrand = function(){
        $http({
            method : "GET",
            url : "car/getbrand",
        }).then(function(res){
            $scope.allData1=res.data;
        })   
    }
    $scope.getmodel = function(obj)
    {
     var data = {brand_id : obj};
        $http({
            method : "POST",
            url : "car/get_model_id",
            data : data
        }).then(function(res){
            $scope.allData2=res.data;
        })
    }
    $scope.getData=function(){
		$http({
			method : "GET",
			url : "car"
		}).then(function(res){
			$scope.allData=res.data;
		});
    }
    
    $scope.add=function(){
        $http({
            method : "POST",
            url : "car",
            data : $scope.newData
        }).then(function(){
             $location.path('/Viewcar');
        });
    }
});
// This controller is for car viewing
app.controller('viewcar',function($scope,$http, $location, $timeout){
  
    $scope.allData = [];
    $scope.newData = {};
    $scope.branddata = {};
    $scope.branddatas = [];
    $scope.vendorData=[];
    $scope.modal_data=[];

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    $scope.dis=function()
    {
        $timeout( function(){
            $scope.msg1 = "";
        }, 3000 );
    }
	$scope.getData=function(){
		$http({
			method : "GET",
			url : "car/view"
		}).then(function(res){
			$scope.allData=res.data;
		});
    }

    $scope.vendorgetData=function(){
		$http({
			method : "GET",
			url : "car"
		}).then(function(res){
			$scope.vendorData=res.data;
		});
    }

    $scope.add=function(){
        $http({
            method : "PUT",
            url : "car",
            data : $scope.newData
        }).then(function(res){
            if (res.data) {
                $scope.msg1="Vehicle Update Successfully";
                $scope.getData();
            }else{
                $scope.msg="Error ! Please try again";
            }
        });
    }

    $scope.deactive=function(obj){
        $http({
            method : "PUT",
            url : "car/deactive",
            data : $scope.selectedObj
        }).then(function(res){
            $scope.getData();
        });
    }
    $scope.active=function(){
        $http({
            method : "PUT",
            url : "car/active",
            data : $scope.selectedObj
        }).then(function(res){
            $scope.getData();
        });
    }

    $scope.askActive=function(obj){
		$scope.selectedObj=obj;
    }
    
	$scope.askUpdate=function(obj){
		angular.copy(obj, $scope.newData);
    }
    
    $scope.askView=function(obj){
		$scope.selectedObj=obj;
	}
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    $scope.addnew=function()
    {
        $location.path('/Addcar');
    }
   $scope.getbrand = function(){
        $http({
            method : "GET",
            url : "car/getbrand",
        }).then(function(res){
            $scope.branddatas=res.data;
        })   
    }
    $scope.getmodal = function(obj){
        var data = {brand_id : obj}
        $http({
            method : "POST",
            url : "car/get_model_id",
            data : data
        }).then(function(res){
            $scope.modal_data=res.data;
        })
    }
});
// This controller is for booking with car booking to confirm of booking
app.controller('booking', function($scope,$http, $location,$localStorage){

    $scope.allData = [];
    $scope.newData = {};
    $scope.vendorData=[];
    $scope.packagedata = {};
    $scope.vedata={};

    $scope.booking=function(){
        $location.path('/Booking');
        $http({
            method : "POST",
            url : "booking",
            data : $scope.newData
        }).then(function(res){
            $scope.allData=res.data;
            console.log(res.data);
        });
    }

    $scope.bookthis=function(obj){
        $scope.selectedObj=obj;
    }

    $scope.package=function(obj, obj2, obj3, obj4)
    {
     $localStorage.from=obj4.from;
     $localStorage.to=obj4.to;
     $localStorage.km=obj;  
     $localStorage.price=obj2;  
     $localStorage.vehicle_id=obj3;
     $location.path('/confirmpage');
    }
    
    $scope.demo=function()
    {
        $scope.packagedata['vehicle_id']=$localStorage.vehicle_id;
         $http({
            method : "POST",
            url : "booking/getcar",
            data : $scope.packagedata
        }).then(function(res){
            $scope.newData=res.data;
            $scope.newData['km']=$localStorage.km;
            $scope.newData['price']=$localStorage.price;
            $scope.newData['to']=$localStorage.to;
            $scope.newData['from']=$localStorage.from;
            $scope.newData['total']=res.data.deposite_amt+$localStorage.price;
            console.log($scope.newData);
        });
    }

    $scope.savedata=function(newab){
        $http({
            method : "POST",
            url : "booking/book",
            data : newab
        }).then(function(res){
            $location.path('/bookingconfirmed');
        });
    }
});
// This controller is for user with add , edit , update, delete
app.controller('user', function($scope, $http, $location){

    $scope.allData = [];
    $scope.newData={};  
    
    $scope.getData=function(){
        $http({
            method : "GET",
            url : "user"
        }).then(function(res){
            var a = Object.keys(res.data).length;
            $scope.count=a;
            $scope.allData=(res.data);

        });
    }
    
    $scope.askView=function(obj){
        $scope.selectedObj=obj;
    }
    
    $scope.deactive=function(obj){
       $http({
            method : "PUT",
            url : "user/deactive",
            data : obj
        }).then(function(res){
            $scope.getData();
        });
    }
    
    $scope.active=function(obj){
       $http({
            method : "PUT",
            url : "user/active",
            data : obj
        }).then(function(res){
            console.log(res.data);
            for(var i = 0; i < $scope.allData.length; i++)
            {
                if($scope.allData[i].user_id == res.data[0].user_id)
                {
                    $scope.allData[i]=res.data[0];
                }
            }
        });
    }
    
    $scope.addnew=function(){
        $location.path('/Adduser');
    }
    
    $scope.adduser=function(){
        $http({
            method : "post",
            url : "user",
            data : $scope.newData
        }).then(function (res) {
           if (Object.keys($scope.newData).length < 7) {
                $location.path();
           }else{
            if (res.data=="012") {
                $scope.msg="User Email id already registered";
            }else{
                $location.path('/User');
            }
           }
        });
    }

    $scope.askUpdate=function(obj){
        angular.copy(obj, $scope.newData);
    }

    $scope.update=function()
    {
        $http({
            method : "PUT",
            url : "user/update",
            data : $scope.newData
        }).then(function () {
            $scope.getData();
        });
    }
        $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});
// This controller is for manager with add , edit , update, delete
app.controller('manager',function($scope,$http, $location){

    $scope.allData = [];
    $scope.newData = {};
    $scope.count="";
    
    $scope.getData=function(){
        $http({
            method : "GET",
            url : "manager"
        }).then(function(res){
            $scope.allData=res.data;
            $scope.count = Object.keys($scope.allData).length;
        });
    }

    $scope.add=function(){
        if (Object.keys($scope.newData).length > 3) {
            if ($scope.newData.password.length!=8) {
                $scope.msg="password min length 8 character";
            }else{
                if ($scope.newData.password!=$scope.newData.cpass) {
                    $scope.msg="password not match";   
                }else{
                    $http({
                        method : "POST",
                        url : "manager",
                        data : $scope.newData
                    }).then(function(res){
                        if (res.data=='012') {
                            $scope.msg="User Email id already registered";
                        }else{
                            $location.path('/Manager'); 
                        }
                    });
                }
            }
        }   
    }

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    
    $scope.addnew = function()
    {
        $location.path('/addmanager');
    }
    
    $scope.askUpdate = function(obj)
    {
        angular.copy(obj, $scope.newData);
    }
    
    $scope.update = function()
    {
        $http({
            method : "PUT",
            url : "manager",
            data : $scope.newData
        }).then(function () {
            $scope.getData();
        });
    }

    $scope.askView=function(obj){
        console.log(obj);
        $scope.selectedObj=obj;
    }

    $scope.deactive=function(obj){
        $http({
            method : "PUT",
            url : "manager/deactive",
            data : obj
        }).then(function () {
            $scope.getData();
        });
    }

    $scope.active=function(obj){
        $http({
            method : "PUT",
            url : "manager/active",
            data : obj
        }).then(function () {
            $scope.getData();
        });
    }
});
// This is for personal profile management with change password
app.controller('profile',function($scope,$http, $location,$window, $timeout){
    
    $scope.newData = {};
    $scope.abc = {};

    $scope.getData= function()
    {
        $scope.abc = {};
        var admin_id = {id : $window.sessionStorage.getItem("Id")};
        $http({
            method : "POST",
            url : "profile",
            data : admin_id
        }).then(function(res){
            $scope.newData = res.data;
            $timeout( function(){
                    $scope.msg = "";
                }, 3000 );
        })  
    }
    
    $scope.askUpdate=function(obj){
        angular.copy(obj, $scope.abc);
    }
    $scope.dis=function()
    {
        $timeout( function(){
            $scope.msg1 = "";
        }, 3000 );
    }
    $scope.update_pass = function()
    {
        var admin_id = {id : $window.sessionStorage.getItem("Id")};
        if ($scope.abc.password==$scope.abc.confirm_password) {
            $http({
                method : "POST",
                url : "profile",
                data : admin_id
            }).then(function(res){
               if (res.data.password==$scope.abc.oldpass) {
                     $scope.abc['id']=admin_id.id;
                     console.log($scope.abc);
                     $http({
                        method : "PUT",
                        url : "profile/change_pass",
                        data : $scope.abc
                        }).then(function(res){
                        if (res.data) {
                            $scope.msg1="Password Change Successfully";
                            $scope.getData();
                        }else{
                            $scope.msg="Error ! Please try again";
                            $timeout( function(){
                                $scope.msg = "";
                            }, 3000 );
                        }
                    });         
               }else{
                    $scope.msg="Error ! Old Password incorrect";
                    $timeout( function(){
                        $scope.msg = "";
                    }, 3000 );
               }
            })  
        }else{
            $scope.msg="Error ! password & confirm password not match";
            $timeout( function(){
                $scope.msg = "";
            }, 3000 );
        }
    }
    $scope.update =function()
    {
        console.log($scope.abc);
        $http({
            method : "PUT",
            url : "profile",
            data : $scope.abc
        }).then(function(res){
            if (res.data) {
                $scope.msg1="Update Successfully";
                $scope.getData();
            }else{
                $scope.msg="Error ! Please try again";
                $timeout( function(){
                    $scope.msg = "";
                }, 3000 );
            }
        });
    }
});
// This is for add , view , update , delete of vehicle Brand
app.controller('vehicle_brand', function($scope, $http, $location, $window, $timeout){

    $scope.allData = [];
    $scope.newData = {};
    $scope.branddata = {};
    $scope.vendorData=[];

    $scope.getbranddata = function(){
        $http({
            method : "GET",
            url : "car/getbrand",
        }).then(function(res){
            $scope.allData=res.data;
        })   
    }

    $scope.addbrand=function()
    {
        $http({
            method : "POST",
            url : "car/addbrand",
            data : $scope.newData
        }).then(function(res){
            if (res.data=='012') {
                $scope.msg="Brand already registered";
                $timeout( function(){
                    $scope.msg = "";
                }, 3000 );
            }else{
                $scope.msg1="Successfully added";
                $timeout( function(){
                    $location.path('/Brand');
                }, 500 );
            }
        })
    }
    $scope.add_new_brand=function()
    {
        $location.path('/addbrand');
    }

    $scope.brand_active=function()
    {
        $http({
            method : "PUT",
            url : "car/brand_active",
            data : $scope.selectedObj
        }).then(function(res){
            $scope.getbranddata();
        });
    }

    $scope.brand_deactive=function(){
        $http({
            method : "PUT",
            url : "car/brand_deactive",
            data : $scope.selectedObj
        }).then(function(res){
            $scope.getbranddata();
        });
    }
    $scope.brand_update=function(){
        $http({
            method : "PUT",
            url : "car/brand_update",
            data : $scope.newData
        }).then(function(res){
            $scope.getbranddata();
        });
    }

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.askDelete=function(obj){
        $scope.selectedObj=obj;
    }

    $scope.askActive=function(obj){
        $scope.selectedObj=obj;
    }
    
    $scope.askUpdate=function(obj){
        angular.copy(obj, $scope.newData);
    }
    
    $scope.askView=function(obj){
        $scope.selectedObj=obj;
    }
});
// This is for add, view , update , delete of vehicle modal
app.controller('vehicle_modal', function($scope, $http, $location, $window, $timeout){

    $scope.allData = [];
    $scope.newData = {};
    $scope.branddata = {};
    $scope.vendorData=[];

    $scope.getbranddata = function(){
        $http({
            method : "GET",
            url : "car/getbrand",
        }).then(function(res){
            $scope.allData=res.data;
        })   
    }

    $scope.getmodaldata = function(){
        $http({
            method : "GET",
            url : "car/getmodal",
        }).then(function(res){
            $scope.allData=res.data;
        })   
    }
    
    $scope.addmodal = function()
    {
        $http({
            method : "POST",
            url : "car/addmodel",
            data : $scope.newData
        }).then(function(res){
            if (res.data=='012') {
                $scope.msg="Model already registered";
                $timeout( function(){
                    $scope.msg = "";
                }, 3000 );
            }else{
                $scope.msg1="Successfully added";
                $timeout( function(){
                    $location.path('/Modal');
                }, 500 );
            }
        })   
    }
    $scope.get_brand_id = function(obj){
        data = {id : obj};
        $http({
            method : "POST",
            url : "car/get_brand_id",
            data : data
        }).then(function(res){
            $scope.branddata=res.data;
        })   
    }
    
    $scope.add_new_modal=function()
    {
        $location.path('/addmodal');
    }
    
    $scope.modal_active=function()
    {
        $http({
            method : "PUT",
            url : "car/modal_active",
            data : $scope.selectedObj
        }).then(function(res){
            $scope.getmodaldata();
        });
    }
    
    $scope.modal_deactive=function(){
        $http({
            method : "PUT",
            url : "car/modal_deactive",
            data : $scope.selectedObj
        }).then(function(res){
            $scope.getmodaldata();
        });
    }
    $scope.askDelete=function(obj){
        $scope.selectedObj=obj;
    }

    $scope.askActive=function(obj){
        $scope.selectedObj=obj;
    }
    
    $scope.askUpdate=function(obj){
        // $scope.newData=obj;
        angular.copy(obj, $scope.newData);
    }
    
    $scope.askView=function(obj){
        // $scope.newData=obj;
        $scope.selectedObj=obj;
    }
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});