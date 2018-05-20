var express = require('express');
var path = require('path');
var uuidv4 = require("uuid/v4");

var bodyParser = require('body-parser');

var dataTaskLayer = require('./repo/dataTaskLayer.js');

var app = express();
var port = 8095;

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/getTaskSet/:login', function(req, res){
    dataTaskLayer.getTaskSet(req.params.login, function(taskSet){
        var obj = {
            success:true,
            taskSet: taskSet
        };
        res.send(obj);
    });
});

app.post('/updateTask', function(req,res){
    if(!req.body.name && !req.body.done && !req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ONE_VALUE_IS_EMPTY']
            }
        );
    }else{
        var task = {
            id:req.body.id,
            name:req.body.name,
            done:req.body.done
        };
        dataTaskLayer.updateTask(task, function(){
            res.send({ success:true });
        });
    }
});

app.post('/addTask', function(req, res){

    if(!req.body.name){
        res.send(
            {
                success:false,
                errorSet:['TASKNAME_EMPTY']
            }
        );
    }else{
        var task = {
            id:uuidv4(),
            name:req.body.name,
            done:false,
            login: req.body.login
        };
        dataTaskLayer.addTask(task, function(){
            res.send({ success:true, task:task });
        });
    }
});


app.post('/deleteTask', function(req,res){
    if(!req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ID_EMPTY']
            }
        );
    }else{
        dataTaskLayer.findTaskById(req.body.id,function(){
            dataTaskLayer.deleteTaskById(req.body.id, function(){
                res.send({ success:true });
            });
        })
    }
});

app.post('/addUser', function (req, res) {
    if(!req.body.login || !req.body.pass){
                res.send(
                    {
                        success:false,
                        errorSet:['USERNAME_OR_PASSWORD_EMPTY']
                    }
                );
            }else{
                var user = {
                    login:req.body.login,
                    pass:req.body.pass
                };
                dataTaskLayer.addUser(user, function(success){
                    res.send({ success:success, login:user.login});
        });
    }
});

app.post('/findUser', function (req, res) {
    if(!req.body.login || !req.body.pass){
        res.send(
            {
                success:false,
                errorSet:['USERNAME_OR_PASSWORD_EMPTY']
            }
        );
    }else{
        var user = {
            login:req.body.login,
            pass:req.body.pass
        };
        dataTaskLayer.findUser(user, function(login){
            
            var s = {
                success: (login != null),
                login :login
            };
            res.send(s);
        });
    }
});

app.post('/findById', function(req,res){
    if(!req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ID_IS_EMPTY']
            }
        );
    }else{
        dataTaskLayer.findTaskById(req.body.id,function(status){
            res.send({ success:status });
        });
    }
});


console.log("Server started port 8095");

app.listen(port);

