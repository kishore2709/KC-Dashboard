require('rootpath')();
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./_helpers/error-handler');
const jwt = require('./_helpers/jwt');

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static('dist'));
app.use(cors());
app.use(jwt());
app.use('/api/users', require('./users/users.controller'));

app.use(errorHandler);

app.post('/api/users/register', jsonParser, (req, res) => {
  console.log(req.body);
  const { firstName, lastName, username, password } = req.body;
  console.log(firstName, lastName, username, password);
  res.status(200);
  res.send({ status: 'okkkkkkkkkk' });
  res.end();
});
<<<<<<< HEAD
/*
=======
<<<<<<< HEAD

// Init database = Mongodb

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tasksDb?replicaSet=rs");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
let countAccess = 0;

const malwares = {
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
  for (let i in arr) {
    ModelLog.find({ malware: arr[i] })
      .exec()
      .then(function(res) {
        malwares[arr[i]] = res.length;
      });
  }
}

// Done
// Nhan connection tu Client
io.on("connection", client => {
  client.on("sub_AA", att_type => {
    //console.log("client is subscribing ..", client);
    setInterval(() => {
      client.emit(att_type, Object.values(malwares));
    }, 2000);
  });

  client.on("sub_UserAccess", att_type => {
    //console.log("client is subscribing ..", client);
    setInterval(() => {
      //console.log(countAccess);
      client.emit(att_type, {
        newLabel: moment()
          .format("hh:mm:ss")
          .toString(),
        newData: countAccess
      });
      console.log(countAccess + 'log');
      countAccess = 0;
    }, timeInterval);
  });
=======
>>>>>>> master
app.post('/api/users/authenticate', jsonParser, (req, res) => {
  console.log(req.body);
  const user = {
    id: 'id',
    username: req.body.username,
    lastName: req.body.username,
  };
  const responseJson = {
    id: 'user.id',
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    token: 'fake-jwt-token',
  };
  res.status(200);
  res.send(responseJson);
  res.end();
>>>>>>> a11a5487451e704ef4044703f55a036a4a4f49a5
});
*/
app.get('/api/status', (req, res) => {
  res.send('ok');
});
app.listen(8081, () => console.log('Listening on port 8081!'));
