var express = require('express');
var app = express();
const dbschema = require('./DBschema');
const mongoose = require('mongoose');
var example = {
  "m_id": "0001",
  "m_name": "Andy",
  "m_roomid": "0001"
};

app.get('/', function (req, res) {
  res.send('Hello World');
})

var server = app.listen(8000, function () {
  console.log("伺服器開啟成功");
})

app.get('/adduser', function (req, res) {
  let userlist = mongoose.model('userlist');
  userlist.create(example, function (err, docs) {
    var DBstatus = (err ? "存入資料庫失敗" : "存入資料庫成功");
    console.log(DBstatus, docs);
    res.send(docs);
  });

});

app.get('/userlist', function (req, res) {
  let userlist = mongoose.model('userlist');
  userlist.find({ "m_id": "0001" }, function (err, user) {
    var DBstatus = (err ? "讀取資料庫失敗" : "讀取資料庫成功");
    console.log(DBstatus);
    res.send(user);
  });
});