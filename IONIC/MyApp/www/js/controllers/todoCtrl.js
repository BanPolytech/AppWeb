app.controller("todoCtrl",["$scope", "$http", 'todoService', function($scope, $http, todoService){

    $scope.taskList = [];

    $scope.howManyDone = function(){
        count = 0;
        $scope.taskList.forEach(element => {
            if(element.done){
                count++
            }
        });
        return count;
    };

    $scope.howManyNotDone = function(){
        return $scope.taskList.length
            -$scope.howManyDone();
    };

    $scope.addTask = function(){

        todoService.addTask($scope.$parent.login, $scope.taskInputName, function(res){
            if(res){
                console.log(res);
                console.log("ajout d'une tache");
                $scope.load();
            }
        });

        $scope.taskInputName = "";
    };

    $scope.update = function(task){

        todoService.updateTask(task, function(res){
            console.log(res);
            $scope.load();
        });
    };

    $scope.delete = function(task){
        var index = $scope.taskList.indexOf(task);
        $scope.taskList.splice(index,1);

        todoService.deleteTask(task._id, function(res){
            console.log(res);
            $scope.load();
        });

    };

    $scope.store = function(){
        localStorage.setItem("taskList", JSON.stringify($scope.taskList));
    };

    $scope.load = function(){
        todoService.getTaskSet($scope.login, function(res){
            $scope.taskList = res;
        });
    };

    $scope.deconnect = function(){
        $scope.$parent.connected = false;
        $scope.$parent.username = "";
        $scope.$parent.error = false;
        $scope.$parent.password = "";
    };

    $scope.$parent.$on("LoadTasksEvent",function(){
        $scope.load();
    });


}]);

