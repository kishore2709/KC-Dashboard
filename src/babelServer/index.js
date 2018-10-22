"use strict";

// Init Socket
var express = require("express");

var app = express();

var server = require("http").Server(app);

var moment = require("moment");

var io = require("socket.io")(server);

var bodyParser = require("body-parser");

var path = require("path");

app.use(express.static('dist'));
var timeInterval = 3000;
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var jsonParser = bodyParser.json();
app.post("/api/setting", jsonParser, function (req, res) {
  res.status(200);
  timeInterval = req.body.timeInterval; //console.log("Time Interval has beeen update: ", timeInterval);

  res.end("ok");
}); // Init database = Mongodb

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/tasksDb?replicaSet=rs");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
var countAccess = 0;
var malwares = {
  Mirai: 0,
  Bashlite: 0,
  B2: 0,
  B4: 0,
  B5: 0,
  B6: 0,
  B7: 0,
  B8: 0,
  B9: 0
};

function getInitData(ModelLog) {
  arr = Object.keys(malwares);

  var _loop = function _loop(i) {
    ModelLog.find({
      malware: arr[i]
    }).exec().then(function (res) {
      malwares[arr[i]] = res.length;
    });
  };

  for (var i in arr) {
    _loop(i);
  }
} // Done
// Nhan connection tu Client


io.on("connection", function (client) {
  client.on("sub_AA", function (att_type) {
    //console.log("client is subscribing ..", client);
    setInterval(function () {
      client.emit(att_type, Object.values(malwares));
    }, 2000);
  });
  client.on("sub_UserAccess", function (att_type) {
    //console.log("client is subscribing ..", client);
    setInterval(function () {
      //console.log(countAccess);
      client.emit(att_type, {
        newLabel: moment().format("hh:mm:ss").toString(),
        newData: countAccess
      });
      countAccess = 0;
    }, timeInterval);
  });
});
server.listen(8000); ///////////////////////

db.once("open", function () {
  console.log("Connect successfully to mongodb!");
  var taskCollection = db.collection("logs");
  var changeStream = taskCollection.watch();
  var accessCollection = db.collection("accessmodels");
  var changeStreamAccess = accessCollection.watch();
  var logSchema = new mongoose.Schema({
    date: Date,
    ip_src: String,
    port_src: String,
    ip_dst: String,
    port_dst: String,
    att_type: String
  });
  var Log = mongoose.model("Log", logSchema);
  getInitData(Log);
  changeStream.on("change", function (change) {
    //console.log(change);
    if (change.operationType === "insert") {
      var task = change.fullDocument;

      switch (task.malware) {
        case "Mirai":
          malwares.Mirai++;
          break;

        case "Bashlite":
          malwares.Bashlite++;
          break;

        case "B2":
          malwares.B2++;
          break;

        case "B4":
          malwares.B4++;
          break;

        case "B5":
          malwares.B5++;
          break;

        case "B6":
          malwares.B6++;
          break;

        case "B7":
          malwares.B7++;
          break;

        case "B8":
          malwares.B8++;
          break;

        case "B9":
          malwares.B9++;
          break;
      } //console.log(malwares);
      //io.sockets.emit('AA', Object.values(malwares));

    }
  });
  changeStreamAccess.on("change", function (change) {
    if (change.operationType === "insert") {
      countAccess++;
    }
  });
});