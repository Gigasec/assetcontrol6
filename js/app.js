var app = angular.module('mainApp',['ngMaterial','ngRoute']);
app.controller('mainController',function($scope,$timeout, $mdSidenav, $log,$mdDialog, $mdToast, $http, $window, $route, myService){
  $scope.assetName = "SAMSUNG TABLET";
  $scope.assetID = "007";
  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };

  $scope.showPageDashboard = function(){
    $scope.assetID = "Dashboard Page";
  };

  $scope.showPageAsset = function(){
    $scope.assetID = "Asset Page";
  };

  $scope.showPageInventory = function(){
    $scope.assetID = "Inventory Page";
  };

  $scope.showPageSettings = function(){
    $scope.assetID = "Settings Page";
  };

  $scope.showPageReports = function(){
    $scope.assetID = "Reports Page";
  };


  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'template/DialogAddAsset.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';

    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.showHelp = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'template/DialogHelp.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';

    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };



  /** Asset Request Dialog **/
  $scope.showAdvancedAssetRequest = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'template/DialogAddAssetRequest.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';

    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };


  /** Edit Asset Request Dialog **/
  $scope.editAssetRequest = function(data) {
    //$scope.id = data;
    //  $scope.modalInstance = data;
    $window.location.href ="#!pageEditAssetRequest";
    myService.set(data);
  };



  /** Edit Asset Request Dialog **/
  $scope.editInventory = function(data) {
    $window.location.href ="#!pageEditInventory";
    myService.set(data);
  };

  /** Edit Asset Request Dialog **/
  $scope.editUserManagement = function(data) {
    $window.location.href ="#!pageEditUserManagement";
    myService.set(data);
  };

  /* Asset Request Single Page **/
  $scope.AssetRequestAnswerSinglePage = function() {
    //  $mdDialog.hide(answer);
    var pinTo = $scope.getToastPosition();
    console.log($scope.addAssetAssetName);
    console.log($scope.addAssetAssetID);
    console.log($scope.addAssetUsername);

    var request = $http({
      method: "post",
      url: "http://192.168.8.104:2403/assetrequest",
      // transformRequest: transformRequestAsFormPost,
      data: {
        username: $scope.addAssetRequestUsername,
        userID: $scope.addAssetRequestUserID,
        //  username: $scope.addAssetUsername
        location: $scope.addAssetRequestLocation,
        assetName: $scope.addAssetRequestAssetName,
        assetID:$scope.addAssetRequestAssetID,
        isApproved:"Not Approved",
        isReturned:"Not Returned"
        //  isMonitored:"md-checked"
      }
    });

    //Loading Toast
    $mdToast.show(
      $mdToast.simple()
      .textContent('...requesting')
      .position(pinTo )
      .hideDelay(3000)
    );
    request.then(
      function( html ) {
        $scope.cfdump = html.data.id;
        console.log("Added Assets Request Response " + html);
        //  console.log(html.data.id);

        //Message Toast
        $mdToast.show(
          $mdToast.simple()
          .textContent('Added Asset Request')
          .position(pinTo )
          .hideDelay(3000)
        );


      }
    );

  };


  /* Asset Request Single Page **/
  $scope.login = function() {
    //  $mdDialog.hide(answer);
    var pinTo = $scope.getToastPosition();

    var request = $http({
      method: "post",
      url: "http://192.168.8.104:2403/users/login",
      // transformRequest: transformRequestAsFormPost,
      data: {
        username: $scope.loginUsername,
        password: $scope.loginPassword
      }
    });

    //Loading Toast
    $mdToast.show(
      $mdToast.simple()
      .textContent('...requesting')
      .position(pinTo )
      .hideDelay(3000)
    );
    request.then(
      function( html ) {
        $scope.cfdump = html.data.id;
        console.log("Login Response " + html);
        console.log("Login Response status " + html.status);
        //  console.log("Login Response uid " + html.data.uid);
        if(html.status == 200){
          console.log("Login path " + html.data.path);
          console.log("empty uid uid - notlogged in");

          ///////
          secondRequest = $http({
            method: "get",
            url: "http://192.168.8.104:2403/users/me",

          });

          secondRequest.then(
            function(secondRequest){
              console.log(secondRequest);
              console.log("USER ME data" + secondRequest);
              console.log("USER path " + secondRequest.data.path);
              $window.location.href = secondRequest.data.path;
            }
          );
          ////////

        }else{
          "we have uid"
        };
        //Message Toast
        $mdToast.show(
          $mdToast.simple()
          .textContent('Logged In')
          .position(pinTo )
          .hideDelay(3000)
        );
      }
    );
  };



  //// SIGN UP //////
  /* Asset Request Single Page **/
  $scope.signup = function() {
    //  $mdDialog.hide(answer);
    var pinTo = $scope.getToastPosition();

    var request = $http({
      method: "post",
      url: "http://192.168.8.104:2403/users",
      // transformRequest: transformRequestAsFormPost,
      data: {
        username: $scope.signupUsername,
        password: $scope.signupPassword,
        path:"userDashboard.html",
      }
    });

    //Loading Toast
    $mdToast.show(
      $mdToast.simple()
      .textContent('...requesting')
      .position(pinTo )
      .hideDelay(3000)
    );
    request.then(
      function( html ) {
        $scope.cfdump = html.data.id;
        console.log("SIGNUP Response " + html);
        //  console.log("SIGNUP path " + html.data.path);
        console.log("SIGNUP Response status " + html.status);
        //  console.log("Login Response uid " + html.data.uid);
        if(html.status == 200){
          console.log("SIGNUP SUCCESS");
          //  $window.location.href = 'index.html';
        }else{
          "we have uid"
        };
        //Message Toast
        $mdToast.show(
          $mdToast.simple()
          .textContent('SUCCESS - User Created')
          .position(pinTo )
          .hideDelay(3000)
        );
      }
    );
  };



  /* Table Delete Single Page **/
  $scope.tableDeleteAssetRequest = function(id) {
    //  $mdDialog.hide(answer);
    var pinTo = $scope.getToastPosition();
    var request = $http({
      method: "delete",
      url: "http://192.168.8.104:2403/assetrequest/" + id,
    });

    //Loading Toast
    $mdToast.show(
      $mdToast.simple()
      .textContent('...requesting')
      .position(pinTo )
      .hideDelay(3000)
    );
    request.then(
      function( html ) {
        //  $window.location.href = "index.html";
        $route.reload();
      }
    );
  };



  /* Asset Request Single Page **/
  $scope.logout = function() {
    //  $mdDialog.hide(answer);
    var pinTo = $scope.getToastPosition();

    var request = $http({
      method: "post",
      url: "http://192.168.8.104:2403/users/logout",
      // transformRequest: transformRequestAsFormPost,
      data: {
        username: $scope.loginUsername,
        password: $scope.loginPassword
      }
    });

    //Loading Toast
    $mdToast.show(
      $mdToast.simple()
      .textContent('...requesting')
      .position(pinTo )
      .hideDelay(3000)
    );
    request.then(
      function( html ) {
        $window.location.href = "index.html";

      }
    );
  };


  function DialogController($scope, $mdDialog, $http, $route) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.editCancel = function() {
      $mdDialog.cancel();
      //  $route.reload();
      //  $window.location.href = "#!pageEditAssetequest";
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
      console.log($scope.addAssetAssetName);
      console.log($scope.addAssetAssetID);
      console.log($scope.addAssetUsername);

      var request = $http({
        method: "post",
        url: "http://192.168.8.104:2403/inventory",
        // transformRequest: transformRequestAsFormPost,
        data: {
          assetID: $scope.addAssetAssetID,
          assetName: $scope.addAssetAssetName,
          //  username: $scope.addAssetUsername
          location: $scope.addAssetLocation,
          cost: $scope.addAssetCost,
          date:$scope.addAssetDate,
          isMonitored:"md-checked"
        }
      });

      request.then(
        function( html ) {
          $scope.cfdump = html.data.id;
          console.log(html);
          console.log(html.data.id);

        }
      );

    };

    /////

    $scope.AssetRequestAnswer = function(answer) {
      //    var pinTo = $scope.getToastPosition();
      $mdDialog.hide(answer);

      meRequest = $http({
        method: "get",
        url: "http://192.168.8.104:2403/users/me",
      });

      meRequest.then(
        function(meRequest){
          console.log(meRequest);
          console.log("ME data" + meRequest);
          //  console.log("USER path " + secondRequest.data.path);
          //  $window.location.href = secondRequest.data.path;

          $scope.uid = meRequest.data.id;

          //////////////////////////////////////////////

          var request = $http({
            method: "post",
            url: "http://192.168.8.104:2403/assetrequest",
            // transformRequest: transformRequestAsFormPost,
            data: {
              username: $scope.addAssetRequestUsername,
              userID: $scope.addAssetRequestUserID,
              //  username: $scope.addAssetUsername
              location: $scope.addAssetRequestLocation,
              assetName: $scope.addAssetRequestAssetName,
              assetID:$scope.addAssetRequestAssetID,
              isApproved:"Not Approved",
              isReturned:"Not Returned",
              uid:$scope.uid
              //  isMonitored:"md-checked"
            }
          });

          request.then(
            function( html ) {
              //  $scope.cfdump = html.data.id;
              console.log("Added Assets Request Response " + html);
              //  console.log(html.data.id);

            }
          );
          /////////////////////////////////////////////


        }
      );
      ////////////////////////////////////

      // $mdToast.show(
      //   $mdToast.simple()
      //   .textContent('Added Asset')
      // //  .position(pinTo )
      //   .hideDelay(3000)
      // );
    };
  }

  /**
  * Supplies a function that will continue to operate until the
  * time is up.
  */
  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
      args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  /**
  * Build handler to open/close a SideNav; when animation finishes
  * report completion in console
  */
  function buildDelayedToggler(navID) {
    return debounce(function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
      .toggle()
      .then(function () {
        $log.debug("toggle " + navID + " is done");
      });
    }, 200);
  }

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
      .toggle()
      .then(function () {
        $log.debug("toggle " + navID + " is done");
      });
    };
  }


  /******* Toast *******/
  var last = {
    bottom: true,
    right: true
  };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
    .filter(function(pos) { return $scope.toastPosition[pos]; })
    .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

  // $scope.showSimpleToast = function() {
  //   var pinTo = $scope.getToastPosition();
  //
  //   $mdToast.show(
  //     $mdToast.simple()
  //     .textContent('Simple Toast!')
  //     .position(pinTo )
  //     .hideDelay(3000)
  //   );
  // };
});

/****** pageInventory inventory table controller *******/
app.controller('controllerDashBoardAssetRequestTable', function($scope, $http){
  //http get for inventory
  $http.get("http://192.168.8.104:2403/assetrequest?isApproved=Not Approved").then(function(response) {
    $scope.DBassetRequestTablePending = response.data;
    //  $scope.DBdataID = response.data;

    console.log("AssetRequestTable Pending Request - " + response.data);

  });
});


app.controller("editAssetRequestCtrl", function($scope, NewsService, myService, $window, $http, $mdToast) {

  $scope.news = NewsService.news;
  $scope.editAssetRequestData = myService.get();

  $scope.editAssetRequestCancel = function() {
    $window.location.href = "#!pageAssetRequest";
  };

  $scope.editAssetRequestUpdate = function(id) {
    var pinTo = $scope.getToastPosition();
    var request = $http({
      method: "put",
      url: "http://192.168.8.104:2403/assetrequest/"+id,
      data: {
        username: $scope.editAssetRequestData.username,
        userID: $scope.editAssetRequestData.userID,
        location: $scope.editAssetRequestData.location,
        assetName: $scope.editAssetRequestData.assetName,
        assetID:$scope.editAssetRequestData.assetID,
      }
    });

    //Loading Toast
    $mdToast.show(
      $mdToast.simple()
      .textContent('...requesting')
      .position(pinTo )
      .hideDelay(3000)
    );
    request.then(
      function( html ) {
        $scope.cfdump = html.data.id;
        console.log("Added Assets Request Response " + html);

        //Message Toast
        $mdToast.show(
          $mdToast.simple()
          .textContent('Added Asset Request')
          .position(pinTo )
          .hideDelay(3000)
        );
      }
    );
  };
});


app.controller("editInventoryCtrl", function($scope, NewsService, myService, $window, $http, $mdToast) {

  $scope.news = NewsService.news;
  $scope.editInventoryData = myService.get();

  $scope.editInventoryCancel = function() {
    $window.location.href = "#!pageInventory";
  };

  $scope.editInventoryUpdate = function(id) {
    var pinTo = $scope.getToastPosition();
    var request = $http({
      method: "put",
      url: "http://192.168.8.104:2403/inventory/"+id,
      data: {
        assetID: $scope.editInventoryData.assetID,
        assetName: $scope.editInventoryData.assetName,
        tagID: $scope.editInventoryData.tagID,
        location: $scope.editInventoryData.location,
        date:$scope.editInventoryData.date,
      }
    });

    //Loading Toast
    $mdToast.show(
      $mdToast.simple()
      .textContent('...requesting')
      .position(pinTo )
      .hideDelay(3000)
    );
    request.then(
      function( html ) {
        $scope.cfdump = html.data.id;
        console.log("Added Assets Request Response " + html);

        //Message Toast
        $mdToast.show(
          $mdToast.simple()
          .textContent('Inentory Updated')
          .position(pinTo )
          .hideDelay(3000)
        );
      }
    );
  };
});


//
app.controller("editUserManagementCtrl", function($scope, NewsService, myService, $window, $http, $mdToast) {

  $scope.news = NewsService.news;
  $scope.editUserManagementData = myService.get();

  $scope.editUserManagementCancel = function() {
    $window.location.href = "#!pageUserManagement";
  };

  $scope.editUserManagementUpdate = function(id) {
    var pinTo = $scope.getToastPosition();
    var request = $http({
      method: "put",
      url: "http://192.168.8.104:2403/users/"+id,
      data: {
       username: $scope.editUserManagementData.username,
        password: $scope.editUserManagementData.password
      }
    });

    //Loading Toast
    $mdToast.show(
      $mdToast.simple()
      .textContent('...requesting')
      .position(pinTo )
      .hideDelay(3000)
    );
    request.then(
      function( html ) {
        $scope.cfdump = html.data.id;
        // console.log("User  Assets Request Response " + html);

        //Message Toast
        $mdToast.show(
          $mdToast.simple()
          .textContent('User Profile Updated')
          .position(pinTo )
          .hideDelay(3000)
        );
      }
    );
  };
});


/***** Edit Service **/
app.service("NewsService", function() {
  return {
    news: {
      theme: "This is one new"
    }
  }
});


app.factory('myService', function() {
  var savedData = {}
  function set(data) {
    savedData = data;
  }
  function get() {
    return savedData;
  }

  return {
    set: set,
    get: get
  }

});




/****** pageInventory inventory table controller *******/
app.controller('controllerInventoryTable', function($scope, $http, $mdToast,$route){
  //http get for inventory
  $http.get("http://192.168.8.104:2403/inventory").then(function(response) {
    $scope.DBdata = response.data;
    $scope.DBdataID = response.data;
    //   console.log("Printing $http");
    console.log("InventoryTable - " + response.data);
    //   angular.forEach($scope.DBdataID, function(value, key){
    //      console.log(key + ': ' + value.id);
    // });
  });



  $scope.showSimpleToast = function(id,isMonitored) {
    var pinTo = $scope.getToastPosition();
    console.log("md-swicth id");
    console.log(id);
    //  console.log($scope.DBdataID);
    if(isMonitored == "md-checked"){
      var request = $http({
        method: "post",
        url: "http://192.168.8.104:2403/inventory/"+id,
        // transformRequest: transformRequestAsFormPost,
        data: {
          isMonitored: ""
        }
      });
      request.then(
        function( html ) {
          console.log("isMonitored - " + html);
          $route.reload();
        }
      );
    }else {
      var request = $http({
        method: "post",
        url: "http://192.168.8.104:2403/inventory/"+id,
        // transformRequest: transformRequestAsFormPost,
        data: {
          isMonitored: "md-checked"
        }
      });
      request.then(
        function( html ) {
          console.log("isMonitored - " + html);
          $route.reload();
        }
      );
    }


    $mdToast.show(
      $mdToast.simple()
      .textContent('Simple Toast!')
      .position(pinTo )
      .hideDelay(3000)
    );
  };
});


/****** pageUserManagement Table *******/
app.controller('controllerUserManagementTable', function($scope, $http, $route, $mdToast){
  //http get for inventory
  $http.get("http://192.168.8.104:2403/users").then(function(response) {
    $scope.userData = response.data;
    console.log("USER MANAGEMENT - " + response);
    console.log(response);
  });


  //isAdmin Privilege
  $scope.changePrivilege = function(id,isAdmin) {
    var pinTo = $scope.getToastPosition();
    console.log("md-swicth id");
    console.log(id);
    //  console.log($scope.DBdataID);
    if(isAdmin == "md-checked"){
      var request = $http({
        method: "post",
        url: "http://192.168.8.104:2403/users/"+id,
        // transformRequest: transformRequestAsFormPost,
        data: {
          isAdmin: "",
          path: "userDashboard.html"
        }
      });
      request.then(
        function( html ) {
          console.log("isAdmin - " + html);
          $route.reload();
        }
      );
    }else {
      var request = $http({
        method: "post",
        url: "http://192.168.8.104:2403/users/"+id,
        // transformRequest: transformRequestAsFormPost,
        data: {
          isAdmin: "md-checked",
          path:"console.html"
        }
      });
      request.then(
        function( html ) {
          console.log("isAdmin - " + html);
          $route.reload();
        }
      );
    }

    $mdToast.show(
      $mdToast.simple()
      .textContent('Admin privilege was changed')
      .position(pinTo )
      .hideDelay(3000)
    );
  };
});


/****** pageUserDashboard *******/
app.controller('controllerUserAssetRequest', function($scope,$http){
  //http get for user specific asset inventory
  var  meRequest = $http({
    method: "get",
    url: "http://192.168.8.104:2403/users/me",
  });

  meRequest.then(
    function(meRequest){
      console.log(meRequest);
      console.log("ME data" + meRequest);
      $scope.uid = meRequest.data.id;

      $http.get("http://192.168.8.104:2403/assetrequest?uid=" +   $scope.uid).then(function(response) {
        $scope.UserAssetRequestData = response.data;
        //   console.log("Printing $http");
        console.log("UserAssetRequestData");
        console.log(response);
        // console.log("AssetCount Length - " + response.data.length);
      });
    });



  });


  /****** pageDashboard  Asset Count *******/
  app.controller('controllerAssetCount', function($scope,$http){
    //http get for inventory
    $http.get("http://192.168.8.104:2403/inventory").then(function(response) {
      $scope.DBAssetCount = response.data.length;
      //   console.log("Printing $http");
      console.log("AssetCount - " + response.data);
      // console.log("AssetCount Length - " + response.data.length);
    });

  });


  /****** pageDashboard  Asset Monitored Count *******/
  app.controller('controllerAssetMonitoredCount', function($scope,$http){
    //http get for inventory
    $http.get("http://192.168.8.104:2403/inventory?isMonitored=md-checked").then(function(response) {
      $scope.DBAssetMonitoredCount = response.data.length;
      //   console.log("Printing $http");
      console.log("AssetMonitoredCount - " + response.data);
      // console.log("AssetCount Length - " + response.data.length);
    });

  });



  /****** pageAssetRequest assetRequest table controller *******/
  app.controller('controllerAssetRequestTable', function($scope,$http, $mdToast){
    //http get for assetRequest
    $http.get("http://192.168.8.104:2403/assetrequest").then(function(response) {
      $scope.DBassetRequest = response.data;

      //   console.log("Printing $http");
      console.log("AssetRequestTable - " + response.data);
    });
    $scope.cfdump = "";

    $scope.selectedChangeReturns = function(id, status) {
      var pinTo = $scope.getToastPosition();
      //  console.log("md-swicth id");
      console.log(id);
      //  console.log($scope.DBdataID);

      var request = $http({
        method: "post",
        url: "http://192.168.8.104:2403/assetrequest/"+id,
        // transformRequest: transformRequestAsFormPost,
        data: {
          isReturned: status
        }
      });
      request.then(
        function( html ) {
          console.log("isReturned - " + html);
          //      $route.reload();
        }
      );

      $mdToast.show(
        $mdToast.simple()
        .textContent('Changing Status')
        .position(pinTo )
        .hideDelay(3000)
      );
    };

    /**** Approval Handler ***/
    $scope.selectedChangeApprovals = function(id, status) {
      var pinTo = $scope.getToastPosition();
      //  console.log("md-swicth id");
      console.log(id);
      //  console.log($scope.DBdataID);

      var request = $http({
        method: "post",
        url: "http://192.168.8.104:2403/assetrequest/"+id,
        // transformRequest: transformRequestAsFormPost,
        data: {
          isApproved: status
        }
      });
      request.then(
        function( html ) {
          console.log("isApproved - " + html);
          //      $route.reload();
        }
      );

      $mdToast.show(
        $mdToast.simple()
        .textContent('Changing Status')
        .position(pinTo )
        .hideDelay(3000)
      );
    };

  });


  app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });
    };
  });
  app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
    };
  });

  /** Header Menu **/
  app.controller('BasicDemoCtrl', function DemoCtrl($mdDialog) {
    var originatorEv;

    this.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

    this.notificationsEnabled = true;
    this.toggleNotifications = function() {
      this.notificationsEnabled = !this.notificationsEnabled;
    };

    this.redial = function() {
      console.log("reeduial");
      $mdDialog.show(
        $mdDialog.alert()
        .targetEvent(originatorEv)
        .clickOutsideToClose(true)
        .parent('body')
        .title('Suddenly, a redial')
        .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
        .ok('That was easy')
      );

      originatorEv = null;
    };

    this.checkVoicemail = function() {
      // This never happens.
    };
  });

  /**Route to Pages**/
  app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "template/pageDashboard.htm"
    })
    .when("/pageDashboard", {
      templateUrl : "template/pageDashboard.htm"
    })
    .when("/pageAssetRequest", {
      templateUrl : "template/pageAssetRequest.htm"
    })
    .when("/pageInventory", {
      templateUrl : "template/pageInventory.htm"
    })
    .when("/pageEditUserManagement", {
      templateUrl : "template/pageEditUserManagement.html"
    })
    .when("/pageSettings", {
      templateUrl : "template/pageSettings.htm"
    })
    .when("/pageEditInventory", {
      templateUrl : "template/pageEditInventory.html"
    })
    .when("/pageEditAssetRequest", {
      templateUrl : "template/pageEditAssetRequest.htm"
    })
    .when("/pageUserManagement", {
      templateUrl : "template/pageUserManagement.htm"
    });
  });

  app.controller('ToastCtrl', function($scope, $mdToast) {
    $scope.closeToast = function() {
      $mdToast.hide();
    };
  });
