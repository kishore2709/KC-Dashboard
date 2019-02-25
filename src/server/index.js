require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const errorHandler = require('./_helpers/error-handler');
const jwt = require('./_helpers/jwt');
const userService = require('./users/user.service');
// const Model = require('./Utils/Schema');

const jsonParser = bodyParser.json();
// Nodejs
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static('dist'));
app.use(cors());
// for f5 deploy..
app.get('/*', (req, res) => {
  console.log('in f5');
  res.sendFile(path.join(__dirname, '../../dist/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});
app.use(jwt());
// for ReCheck PassWd when Change passwd
app.use((req, res, next) => {
  if (
    req.url === '/api/users/authenticate' ||
    req.url === '/authenticate' ||
    req.url === '/api/users/saveLog'
  )
    next();
  else {
    userService
      .checkPwd(req.user)
      .then(ret => {
        if (ret === 0 || !ret) {
          console.log('in recheck passwd has ret', ret);
          res.status(404).send();
        } else {
          console.log(ret);
          console.log('ok in recheck');
          next();
        }
      })
      .catch(err => {
        console.log(err);
        res.status(404).send();
        console.log('in recheck passwd err');
      });
  }
});
// get ip addr
app.use((req, res, next) => {
  const xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(
    /:\d+$/,
    ''
  );
  const ip = xForwardedFor || req.connection.remoteAddress;
  console.log(ip);
  req.ipAddr = ip;
  next();
});
app.use('/api/users', require('./users/users.controller'));
app.use('/api/groups', require('./groups/groups.controller'));

app.use(errorHandler);
const mongodbURI = 'mongodb://localhost/usermanager';
const db = mongoose.connection;

db.on('connecting', () => {
  console.log('connecting to MongoDB...');
});

db.on('error', error => {
  console.error(`Error in MongoDb connection: ${error}`);
  mongoose.disconnect();
});
db.on('connected', () => {
  console.log('MongoDB connected!');
});

db.once('open', () => {
  console.log('MongoDB connection opened!');
  app.listen(8081, () => console.log('Listening on port 8081!'));
});

db.on('reconnected', () => {
  console.log('MongoDB reconnected!');
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected!');
  mongoose.connect(
    mongodbURI,
    { server: { auto_reconnect: true } }
  );
});

mongoose.connect(
  mongodbURI,
  { server: { auto_reconnect: true } }
);