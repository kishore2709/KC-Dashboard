require('rootpath')();
const express = require('express');
const status = require('http-status');

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bluebird = require('bluebird');
// logging
const morgan = require('morgan');
const redis = require('redis');
const clientRedis = require('./redis');
//
const errorHandler = require('./_helpers/error-handler');
const jwt = require('./_helpers/jwt');
const userService = require('./users/user.service');
// const Model = require('./Utils/Schema');
const ip = require('./Utils/ListIpAddress');

// promise for redis
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const jsonParser = bodyParser.json();
// Nodejs
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
// log
app.use(morgan('combined'));
// jsonParser
app.use(jsonParser);
app.use(urlencodedParser);
// gzip compress
if (process.env.NODE_ENV === 'production')
  app.get(/\.js$|\.css$|\.html$/, (req, res, next) => {
    // console.log('gzip..');
    // console.log('=====================');
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });

app.use(express.static(path.join(__dirname, '../../dist')));

// Send mail to Gmail

// app.post('/api/sendEmails', jsonParser, (req, res) => {
//   console.log(req.body);

//   htmlContent = req.body.askAns
//     .map(content => `<h2>${content.ask}</h2><p>${content.ans}</p><br/>`)
//     .join('');
//   console.log(htmlContent);
//   const newArrEmail = [];
//   for (let i = 0; i < req.body.emailList.length; i++)
//     newArrEmail.push(req.body.emailList[i].Email);
//   console.log(newArrEmail);
//   sendEmails(
//     newArrEmail,
//     'Cập nhật câu trả lời cho sinh viên',
//     'etc.',
//     htmlContent
//   )
//     .then(ans => {
//       res.status(200);
//       console.log(ans);
//       res.send({ status: 'ok' });
//     })
//     .catch(err => {
//       res.status(400);
//       console.log('error in sendEmail');
//       console.log(err);
//       res.send({ status: 'err' });
//     });
// });

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
          res.status(401).send({ status: false, message: 'wrong pwd' });
        } else {
          // console.log(ret);
          console.log('ok in recheck');
          next();
        }
      })
      .catch(err => {
        console.log(err);
        console.log('in recheck passwd err');
        res.status(401).send({ status: false, message: 'wrong pwd' });
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
// const mongodbURI = 'mongodb://localhost/KCdb';
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

clientRedis.on('error', err => {
  console.log('Error redis', err);
});
clientRedis.on('connect', () => {
  console.log('Redis client connected');
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
  mongoose.connect(ip.db, { server: { auto_reconnect: true } });
});

mongoose.connect(ip.db, { server: { auto_reconnect: true } });
