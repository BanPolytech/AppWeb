//declaration
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//for generate GUID
var uuidv4 = require("uuid/v4");


mongoose.connect('mongodb://localhost/todo', function (err) {
    if(err){
        throw err;
    }else{
        console.log('mongo connected');
    }
});

//declare schema TASK
var TaskSchema = Schema({
    _id:String,
    name:String,
    done:Boolean,
    login: String
});

//declare schema USER
var UserSchema = Schema({
    login: {type: String, unique:true},
    pass : String
});

//Init model
var TaskModel = mongoose.model('tasks', TaskSchema);
var UserModel = mongoose.model('users', UserSchema);

module.exports = {
    getTaskSet: function(login, cb){
        TaskModel.find({'login':login}, function (err, taskset) {
            if(err) {
                throw err;
            } else {
                cb(taskset);
            }
        });
    },

    findTaskById: function(id, cb){
        TaskModel.findById(id,function(err, task){
            if(err){
                throw err;
            }else{
                if(task!=null){
                    cb();
                }
            }
        });
    },

    addTask: function(task, cb){
        var taskToSave = new TaskModel({
            _id:task.id,
            name:task.name,
            done:task.done,
            login:task.login
        });
        taskToSave.save(function(err){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    updateTask: function(task, cb){
        TaskModel.findByIdAndUpdate(task.id, task, function(err, task){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    deleteTaskById: function(id, cb){
        TaskModel.findByIdAndRemove(id, function(err, todo){
            if (err){
                throw err;
            }else{
                cb(todo);
            }
        });
    },

    addUser: function(user, cb){
        var newUser = new UserModel({
            login:user.login,
            pass:user.pass
        });
        newUser.save(function(err){
            if(err){
                cb(false)
            }else{
                cb(true);
            }
        });
    },

    
    findUser: function(user, cb){
        var seekUser = {
            login:user.login,
            pass:user.pass
        };
        UserModel.findOne(seekUser, function (err, userSet) {
            if(err){
                throw err;
            }else{
                if(userSet == null){
                    cb(null);
                }else {
                    cb(userSet.login);
                }
            }
        });
    }
};