const jwt = require('jsonwebtoken');
const config = require('../config.json');
const Models = require('../Utils/Schema');
const co = require('co');
// #### >>>  Init Mongodb
const { User, Log, Group, City, DnsLog, WebLog, Report } = Models;
const dashboardService = require('../services/dashboard.js');
// bcrypt
const bcrypt = require('bcrypt');
const defaultPassword = require('../Utils/pwd');

const saltRounds = 10;

module.exports = {
  authenticate,
  getAll,
  updateDb,
  deleteDb,
  addDb,
  getUsers,
  getUserInfo,
  dashboardData,
  resetPassword,
  checkPwd,
  changePassword,
  saveLog,
  getLog,
  getCitiesInfo,
  sendEmails,
  sendSMS,
};

async function forArray(arr, start, end) {
  const promises = arr.map(
    async city =>
      new Promise((resolve, reject) => {
        const { _id: id, markerOffset, name, coordinates, ip, status } = city;
        let dnsArr = [];
        let webArr = [];
        let dnsLogs = DnsLog.find({ city: id })
        let webLogs = WebLog.find({ city: id })
        if (start && end) {
          dnsLogs = dnsLogs.where('timestamp').gte(start).lte(end)
          webLogs = webLogs.where('timestamp').gte(start).lte(end)
        }
        dnsLogs = dnsLogs.countDocuments().exec().then(dnsCount => {
          let dnsQuery = DnsLog.find({ city: id });
          if (start && end) {
            dnsQuery = dnsQuery.where('timestamp').gte(start).lte(end)
          }
          if (dnsCount <= 200) {
            return dnsQuery.exec()
          } else {
            let timestamp = 0;
            let count = 0;
            let city = '';
            let counter = 0;
            let chunkSize = Math.round(dnsCount / 200);
            const dnsCursor = dnsQuery.cursor();
            return co(function*() {
              for (let dns = yield dnsCursor.next(); dns != null; dns = yield dnsCursor.next()) {
                timestamp += dns.timestamp.getTime()
                count += dns.count
                city = dns.city
                counter += 1
                if (counter >= chunkSize) {
                  dnsArr.push({
                    timestamp: new Date(Math.round(timestamp / counter)),
                    count: Math.round(count / counter),
                    city: city,
                  })
                  timestamp = 0;
                  count = 0;
                  city = '';
                  counter = 0;
                }  
              }
            }).then(() => {
              if (counter > 0) {
                dnsArr.push({
                  timestamp: new Date(Math.round(timestamp / counter)),
                  count: Math.round(count / counter),
                  city: city,
                })
                timestamp = 0;
                count = 0;
                city = '';
                counter = 0;
              }
              return Promise.resolve(dnsArr);
            });
          }
        })
        webLogs = webLogs.countDocuments().exec().then(webCount => {
          let webQuery = WebLog.find({ city: id });
          if (start && end) {
            webQuery = webQuery.where('timestamp').gte(start).lte(end)
          }
          if (webCount <= 200) {
            return webQuery.exec()
          } else {
            let timestamp = 0;
            let count = 0;
            let city = '';
            let counter = 0;
            let chunkSize = Math.round(webCount / 200);
            const webCursor = webQuery.cursor();
            return co(function*() {
              for (let web = yield webCursor.next(); web != null; web = yield webCursor.next()) {
                timestamp += web.timestamp.getTime()
                count += web.count
                city = web.city
                counter += 1
                if (counter >= chunkSize) {
                  webArr.push({
                    timestamp: new Date(Math.round(timestamp / counter)),
                    count: Math.round(count / counter),
                    city: city,
                  })
                  timestamp = 0;
                  count = 0;
                  city = '';
                  counter = 0;
                }  
              }
            }).then(() => {
              if (counter > 0) {
                webArr.push({
                  timestamp: new Date(Math.round(timestamp / counter)),
                  count: Math.round(count / counter),
                  city: city,
                })
                timestamp = 0;
                count = 0;
                city = '';
                counter = 0;
              }
              return Promise.resolve(webArr);
            });
          }
        })
        let reportsQuery = Report.find({ city: id })
        const reports = reportsQuery.exec();
        Promise.all([dnsLogs, webLogs, reports])
          .then(values => {
            resolve({
              dnslogs: values[0],
              weblogs: values[1],
              reports: values[2],
              id,
              markerOffset,
              name,
              coordinates,
              ip,
              status,
              startDate: start.getTime(),
              endDate: end.getTime(),
            });
          })
          .catch(err => reject(err));
      }) 
  );
  return Promise.all(promises); 
}

async function getCitiesInfo(start, end) {
  return new Promise((resolve, reject) => {
    const cities = City.find({}).exec();
    cities.then(cities => {
      // console.log('in cities', cities);
      if (!cities || !Array.isArray(cities)) return reject(false);
      forArray(cities, start, end)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  });
}

// / Send Email
async function sendEmails(toEmails, subject, content, html) {
  const credentials = {
    user: 'devpython.dat@gmail.com',
    pass: 'dat182980',
    to: toEmails,
  };
  const result = false;
  const send = await require('gmail-send')({
    user: credentials.user, // Your GMail account used to send emails
    pass: credentials.pass, // Application-specific password
    to: credentials.to,
    subject,
    text: content,
    // html: html
  });
  const filepath = './demo_attachment.txt';
  // console.log("=======>>>> xem server co nhan chua", toEmails);
  return new Promise((resolve, reject) => {
    send({}, (err, res) => {
      console.log('Loi gui email la:', err, '; ket qua la', res);
      if (err) {
        reject('err');
      } else {
        console.log('tr');
        resolve('ok');
      }
    });
  });
}
// };
// Send SMS by API
// async function sendSMS(toSMS, content) {
//   const Nexmo = require('nexmo');
//   const nexmo = new Nexmo({
//     apiKey: '916a1fdc',
//     apiSecret: 'hpoFIzrIpW8jjRyQ'
//   })

//   const from = 'Nexmo'
//   const to = toSMS
//   const text = content
//   console.log("====>>>> xen co gui sms ko");
//   nexmo.message.sendSms(from, to, text)
//   return true;
// }
// Send SMS by Dcom
async function sendSMS(toSMS, content) {
  console.log('in SendSMS');
  const exec = require('child_process').exec;

  let res = 'python src/server/users/SendSMS.py ';
  res = `${res + toSMS.toString()} ` + `"${content}"`;
  const { stdout, stderr } = await exec(res);
  return true;
}
async function saveLog(obj) {
  return new Promise((resolve, reject) => {
    // console.log(obj);
    if (
      !obj ||
      !('username' in obj) ||
      !('timestamp' in obj) ||
      !('status' in obj) ||
      !('isLogin' in obj) ||
      !('ip' in obj)
    )
      return reject(obj);
    // console.log(obj);
    let { username, timestamp, status, isLogin, ip } = obj;
    username = username.toString().toLowerCase();
    const log = new Log({ username, timestamp, status, isLogin, ip });
    log.save((err, newLog) => {
      // console.log(err, newLog, 'svae ok');
      if (err) reject(err);
      else resolve(newLog);
    });
  });
}

async function getLog(obj) {
  return Log.find({}).exec();
}

async function checkPwd(obj) {
  const ret = 0;
  const { sub: id, dat } = obj;
  return User.findById(id)
    .exec()
    .then(user => {
      if (!user) throw new Error(user);
      if (user.password !== dat) throw new Error('wrong pass');
      return user;
    });
}

async function dashboardData() {
  return dashboardService;
}

async function getUserInfo(obj) {
  const { _id, ...rest } = obj;
  return User.findById(_id).exec();
}

async function getUsers() {
  return User.find({}).exec();
}

async function addDb(obj) {
  if (!obj || !('username' in obj) || !('role' in obj)) return 0;
  // to lowercase;
  obj.username = obj.username.toString().toLowerCase();
  obj.role = obj.role.toString().toLowerCase();

  return User.find({ username: obj.username })
    .exec()
    .then(user => {
      console.log('in check username');
      // check Username exist?
      if (Array.isArray(user) && user.length > 0) throw new Error('user exist');
      return user;
    })
    .then(() => {
      console.log('in check groups...');
      // check role - groupname exist ? -> set Permission Group for user
      return Group.find({ groupname: obj.role })
        .exec()
        .then(docs => {
          if (docs.length === 0) throw new Error('length == 0');
          return docs[0].permissions;
        })
        .then(groupUserPermission => {
          // add User to db
          const user = new User({ ...obj, permissions: groupUserPermission });
          return new Promise((resolve, reject) => {
            user.save((err, newUser) => {
              if (err) {
                reject(err);
              } else {
                console.log('add user ok');
                resolve(newUser);
              }
            });
          });
        });
    });
  // if (Array.isArray(tmpUsers) && tmpUsers.length > 0) return 0;
}

async function deleteDb(obj) {
  if (!obj || !('id' in obj)) return 0;
  const { id, ...rest } = obj;
  return User.findByIdAndRemove(id).exec();
}

async function updateDb(objArr) {
  const promises = objArr.map(
    async obj =>
      new Promise((resolve, reject) => {
        if (!obj || !('username' in obj) || !('id' in obj))
          reject('key error in user');
        // to lowerCase
        obj.username = obj.username.toString().toLowerCase();
        // ensure no update password
        let { id, username, ...rest } = obj;
        if ('password' in rest) {
          const { password, ...restTwo } = rest;
          rest = restTwo;
        }
        if ('oldPassword' in rest) {
          const { oldPassword, ...restThree } = rest;
          rest = restThree;
        }
        if ('newPassword' in rest) {
          const { newPassword, ...restFour } = rest;
          rest = restFour;
        }
        // console.log(rest);
        User.findByIdAndUpdate(id, { $set: rest })
          .exec()
          .then(res => {
            if (!res) throw new Error(res);
            resolve(res);
          })
          .catch(err => reject(err));
      })
  );
  return Promise.all(promises);
}

async function authenticate(obj) {
  // console.log(obj);
  // console.log('in auth');
  if (!obj || !('username' in obj) || !('password' in obj)) return 0;
  obj.username = obj.username.toString().toLowerCase();
  const { username, password } = obj;
  // console.log(username, password);
  return new Promise((resolve, reject) => {
    User.find({ username }, (err, docs) => {
      // console.log(err, docs);
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (docs.length === 0) {
          reject(new Error('err'));
          return;
        }
        const user = docs[0];
        // console.log(user);
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) reject(err);
          if (!res) resolve(false);
          const token = jwt.sign(
            {
              sub: user.id,
              dat: user.password,
            },
            config.secret
          );
          const {
            _id,
            password,
            username,
            role,
            fullname,
            email,
            phonenumber,
            permissions,
            status,
            changePwd,
          } = user;
          resolve({
            _id,
            permissions,
            username,
            role,
            fullname,
            email,
            phonenumber,
            status,
            token,
            changePwd,
          });
        });
      }
    });
  });
}

async function getAll() {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      console.log(users);
    }
  });
}

async function resetPassword(obj) {
  let { id, password, ...rest } = obj;
  password = defaultPassword;
  return User.findByIdAndUpdate(id, {
    $set: { ...rest, password, changePwd: true },
  }).exec();
}

async function changePassword(obj) {
  return new Promise((resolve, reject) => {
    if (
      !obj ||
      !('oldPassword' in obj) ||
      !('id' in obj) ||
      !('newPassword' in obj)
    )
      return 0;
    const { id, oldPassword: password, newPassword } = obj;
    User.findById(id, (err, doc) => {
      if (err) reject(0);
      if (!('password' in doc)) reject(0);
      bcrypt.compare(password, doc.password, (err, res) => {
        // res == true
        if (err) reject(0);
        if (res == false) reject(0);
        else {
          const hashPass = bcrypt.hashSync(newPassword, saltRounds);
          User.findByIdAndUpdate(
            id,
            { $set: { password: hashPass, changePwd: false } },
            err => {
              if (err) {
                console.log('Change pwd error');
                reject(0);
              } else {
                console.log('Change pwd ok');
                resolve(
                  jwt.sign(
                    {
                      sub: id,
                      dat: hashPass,
                      permissions: ['admin', 'user:read', 'user:write'],
                    },
                    config.secret
                  )
                );
              }
            }
          );
        }
      });
    });
  });
}
