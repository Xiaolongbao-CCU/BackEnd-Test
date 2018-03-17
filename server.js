var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Database Connected.");
});

mongoose.model('users', {
    name: String
});

//UserList
mongoose.model('userlist', {
    m_id: String,
    m_name: String,
    m_createTime: {
        type: Date,
        default: Date.now
    },
    m_roomid: String
});




// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

app.get('/get', function (req, res) {

    var user = mongoose.model('users');

    var a = new user({
        name: req.query.name
    });

    a.save(function (err, user) {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        console.log(user.name);
    });
});

app.get('/adduser', function (req, res) {
    let userlist = mongoose.model('userlist');

    var example = {};
    userlist.create(example, function (err, docs) {
        var DBstatus = (err ? "存入資料庫失敗" : "存入資料庫成功");
        console.log(DBstatus, docs);
        res.send(docs);
    });
});

app.get('/userlist', function (req, res) {
    let userlist = mongoose.model('userlist');

    userlist.find({},
        function (err, docs) {
            var DBstatus = (err ? "讀取資料庫失敗" : "讀取資料庫成功");
            console.log(DBstatus, docs);
            res.send(docs);
        });
});


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("建立成功 ")
});