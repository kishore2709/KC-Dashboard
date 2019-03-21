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
const ip = require('./Utils/ListIpAddress');

const jsonParser = bodyParser.json();
// Nodejs
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static('dist'));
// gzip compress
app.get('*.js', (req, res, next) => {
  req.url += '.br';
  res.set('Content-Encoding', 'br');
  next();
});
// Send mail to Gmail
const sendEmails = async (toEmails, subject, content, html) => {
  const credentials = {
    user: 'huanthemenk55@gmail.com',
    pass: 'policehtm9x',
    to: toEmails,
  };
  const result = false;
  let send = require('gmail-send')({
    user: credentials.user, // Your GMail account used to send emails
    pass: credentials.pass, // Application-specific password
    to: credentials.to,
    // from:    credentials.user,            // from: by default equals to user
    // replyTo: credentials.user,            // replyTo: by default undefined
    // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
    subject,
    text: content,
    html,
  });
  console.log('* [example 1.1] sending test email');
  return new Promise((resolve, reject) => {
    send({}, (err, res) => {
      console.log(
        "* [example 1.1] send() callback returned: err:",
        err,
        "; res:",
        res
      );
      if (err) {
        reject("err");
      } else {
        console.log("tr");
        resolve("ok");
      }
    });
  });
};
app.post('/api/sendEmails', jsonParser, (req, res) => {
  console.log(req.body);

  htmlContent = req.body.askAns
    .map(content => {
      return `<h2>${content.ask}</h2><p>${content.ans}</p><br/>`;
    })
    .join("");
  console.log(htmlContent);
  let newArrEmail = [];
  for (let i = 0; i < req.body.emailList.length; i++)
    newArrEmail.push(req.body.emailList[i].Email);
  console.log(newArrEmail);
  sendEmails(newArrEmail, "Cập nhật câu trả lời cho sinh viên", "etc.", htmlContent)
    .then(ans => {
      res.status(200);
      console.log(ans);
      res.send({ status: "ok" });
    })
    .catch(err => {
      res.status(400);
      console.log("error in sendEmail");
      console.log(err);
      res.send({ status: "err" });
    });
});

app.use(cors());
// for f5 deploy..
app.get('/*', (req, res) => {
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
          // console.log(ret);
          console.log('ok in recheck');
          next();
        }
      })
      .catch(err => {
        console.log(err);
        console.log('in recheck passwd err');
        res.status(404).send();
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
