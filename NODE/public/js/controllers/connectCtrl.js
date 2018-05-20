app.controller("connectCtrl", ["$scope", "$http", 'todoService', function($scope, $http, todoService){

    $scope.addUser = function(){
  
        todoService.addUser($scope.login, $scope.pass, function(res){
            if(res){
                console.log(res);
                if(res.success){
                    console.log("add user");
                    $scope.$parent.connected = res.success;
                    $scope.$parent.error = false;
                    $scope.$parent.login = res.login;
                    $scope.$parent.$emit("LoadTasksEvent",{});
                }else{
                    $scope.$parent.error = true;
                    $scope.$parent.pass = "";
                }
            }
        });
    };
  
    $scope.connect = function () {
        todoService.findUser($scope.login, $scope.pass, function(res){
            if(res){
                console.log(res);
                if(res.success){
                    console.log("user connected");
                    $scope.$parent.connected = res.success;
                    $scope.$parent.error = true;
                    $scope.$parent.login = res.login;
                    $scope.$parent.$emit("LoadTasksEvent",{});
                }else{
                    $scope.$parent.error = true;
                    $scope.$parent.pass = "";
                }
            }
        });
    }
  }]);
  