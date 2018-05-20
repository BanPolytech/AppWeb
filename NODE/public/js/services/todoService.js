app
.factory('todoService',
    ['$http',
    function($http){
        var server = {};

        server.addTask = function (login, name, cb) {
            var req = {
                name:name,
                login:login
            };
            console.log(req);
            $http.post('/addTask', req)
                .then(function (res) {
                    cb(res);
                });
        };

        server.deleteTask = function(id, cb){
            var req = {id: id};
            $http.post('/deleteTask', req)
                .then(function(res){
                    cb(res);
                });
        };

        server.updateTask = function(task, cb){
            var req = {
                id:task._id,
                name:task.name,
                done:task.done
            };
            $http.post('/updateTask', req)
                .then(function(res) {
                    cb(res);
                });
        };

        server.getTaskSet = function (login, cb) {
            $http.post('/getTaskSet/' + login)
                .then(function (resp) {
                    console.log(resp.data);
                    cb(resp.data.taskSet);
                });
        };

        server.addUser = function (login, pass, cb) {
            var req = {
                login:login,
                pass:pass
            };
            $http.post('/addUser', req)
                .then(function(res) {
                    cb(res.data);
                });
        };

        server.findUser = function (login, pass, cb) {
            var req = {
                login:login,
                pass:pass
            };
            $http.post('/findUser', req)
                .then(function(res) {
                    cb(res.data);
                });
        };

        return server;
    }]);