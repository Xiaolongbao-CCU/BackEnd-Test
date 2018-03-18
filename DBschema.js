const mongoose = require('mongoose');
//Connection
mongoose.connect('mongodb://localhost:27017/wemeet');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Database Connected.");
});

//Schema

//UserList
let userlist = mongoose.model('userlist', {
  m_id: String,
  m_name: String,
  m_createTime: { type: Date, default: Date.now },
  m_roomid: String
});

//RoomList
let roomlist = mongoose.model('roomlist', {
  room_id: String,
  room_name: String,
  room_people: Number,
  room_memberlist: { room_mid: String },
  room_status: String,
  room_createTime: { type: Date, default: Date.now },
  room_endDate: Date
});

//NoteList
let notelist = mongoose.model('notelist', {
  note_id: String,
  note_pageid: String,
  note_content: String,
  note_userid: String,
  note_color: String,
  note_createTime: { type: Date, default: Date.now }
});


//WhitePaperList
let whitepaperlist = mongoose.model('whitepaperlist', {
  page_id: String,
  page_roomid: String,
  page_noteid: String
});

