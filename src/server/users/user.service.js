const jwt = require('jsonwebtoken');
const co = require('co');
const faker = require('faker');
const bcrypt = require('bcrypt');
const config = require('../config.json');
const Models = require('../Utils/Schema');
// #### >>>  Init Mongodb
const { User, Log, Group, City, DnsLog, WebLog, Report } = Models;
const dashboardService = require('../services/dashboard.js');
// bcrypt
const clientRedis = require('../redis');

const defaultPassword = require('../Utils/pwd');

const saltRounds = 10;

faker.locale = 'vi';

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
  getAllCities,
  getData,
  // log
  getDNSLogByTime,
  getWebLogByTime,
  getSessionLogByTime,
};

async function getWebLogByTime(startTime, endTime, startIndex, endIndex) {
  const res = [];
  for (let i = startIndex; i <= endIndex; i++)
    res.push({
      date: faker.date.between(startTime, endTime).toISOString(),
      time: '06:26:18',
      s_sitename: 'W3SVC1',
      s_computername: 'WIN2008R2-TEST',
      server_ip: '192.168.0.52',
      cs_method: 'GET',
      cs_uri_stem: '/',
      cs_uri_query: '-',
      s_port: '80',
      cs_username: '-',
      c_ip: '192.168.0.66',
      cs_version: 'HTTP/1.1',
      cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
      cs_cookie: '-',
      cs_referer: '-',
      cs_host: '192.168.0.52',
      sc_status: '200',
      sc_substatus: '0',
      sc_win32_status: '0',
      sc_bytes: '936',
      cs_bytes: '116',
      time_taken: '10',
    });
  return res;
  // let tmp =
}

async function getDNSLogByTime(startTime, endTime, startIndex, endIndex) {
  const res = [];
  for (let i = startIndex; i <= endIndex; i++)
    res.push({
      date: faker.date.between(startTime, endTime).toISOString(),
      time: '16:01:00.812',
      c_ip: '192.168.0.57',
      c_port: '47086',
      query_name: 'ocsp.digicert.com',
      query_class: 'IN',
      query_type: 'AAAA',
      query_flags: '+',
    });
  return res;
  // let tmp =
}

async function getSessionLogByTime(startTime, endTime, startIndex, endIndex) {
  const res = [];
  for (let i = startIndex; i <= endIndex; i++)
    res.push({
      id: i,
      ip: faker.internet.ip(),
      email: faker.internet.email(),
      date: faker.date.between(startTime, endTime).toISOString(),
      sessionType: i % 4 === 0 ? 'Đăng xuất' : 'Đăng nhập',
    });
  return res;
  // let tmp =
}
function getDataOneCity(city, start, end) {
  console.log(city, start, end);
  return new Promise((resolve, reject) => {
    const { id } = city;
    const dnsArr = new Array(300);
    const webArr = new Array(300);
    let dnsLogs = DnsLog.find({ city: id });
    let webLogs = WebLog.find({ city: id });
    if (start && end) {
      dnsLogs = dnsLogs
        .where('timestamp')
        .gte(start)
        .lte(end);
      webLogs = webLogs
        .where('timestamp')
        .gte(start)
        .lte(end);
    }
    dnsLogs = dnsLogs
      .countDocuments()
      .lean()
      .then(dnsCount => {
        let dnsQuery = DnsLog.find({ city: id });
        if (start && end) {
          dnsQuery = dnsQuery
            .where('timestamp')
            .gte(start)
            .lte(end);
        }
        if (dnsCount <= 200) {
          return dnsQuery.lean();
        }
        let timestamp = 0;
        let count = 0;
        let city = '';
        let counter = 0;
        let arrSize = -1;
        const chunkSize = Math.round(dnsCount / 200);
        const dnsCursor = dnsQuery.cursor();
        return new Promise((resolve, reject) => {
          dnsCursor
            .on('data', dns => {
              timestamp += dns.timestamp.getTime();
              count += dns.count;
              city = dns.city;
              counter += 1;
              if (counter >= chunkSize) {
                dnsArr[++arrSize] = {
                  timestamp: new Date(Math.round(timestamp / counter)),
                  count: Math.round(count / counter),
                  city,
                };
                timestamp = 0;
                count = 0;
                city = '';
                counter = 0;
              }
            })
            .on('end', () => {
              if (counter > 0) {
                dnsArr[++arrSize] = {
                  timestamp: new Date(Math.round(timestamp / counter)),
                  count: Math.round(count / counter),
                  city,
                };
                timestamp = 0;
                count = 0;
                city = '';
                counter = 0;
              }
              resolve(dnsArr.filter(dns => dns != null));
            });
        });
      });
    webLogs = webLogs
      .countDocuments()
      .lean()
      .then(webCount => {
        let webQuery = WebLog.find({ city: id });
        if (start && end) {
          webQuery = webQuery
            .where('timestamp')
            .gte(start)
            .lte(end);
        }
        if (webCount <= 200) {
          return webQuery.lean();
        }
        let timestamp = 0;
        let count = 0;
        let city = '';
        let counter = 0;
        let arrSize = -1;
        const chunkSize = Math.round(webCount / 200);
        const webCursor = webQuery.cursor();
        return new Promise((resolve, reject) => {
          webCursor
            .on('data', web => {
              timestamp += web.timestamp.getTime();
              count += web.count;
              city = web.city;
              counter += 1;
              if (counter >= chunkSize) {
                webArr[++arrSize] = {
                  timestamp: new Date(Math.round(timestamp / counter)),
                  count: Math.round(count / counter),
                  city,
                };
                timestamp = 0;
                count = 0;
                city = '';
                counter = 0;
              }
            })
            .on('end', () => {
              if (counter > 0) {
                webArr[++arrSize] = {
                  timestamp: new Date(Math.round(timestamp / counter)),
                  count: Math.round(count / counter),
                  city,
                };
                timestamp = 0;
                count = 0;
                city = '';
                counter = 0;
              }
              resolve(webArr.filter(web => web != null));
            });
        });
      });
    const reportsQuery = Report.find({ city: id });
    const reports = reportsQuery.lean();
    Promise.all([dnsLogs, webLogs, reports])
      .then(values => {
        resolve({
          dnslogs: values[0],
          weblogs: values[1],
          reports: values[2],
        });
      })
      .catch(err => reject(err));
  });
}

async function forArray(arr, start, end) {
  const promises = arr.map(async city => getDataOneCity(city, start, end));
  return Promise.all(promises);
}

async function getAllCities() {
  return new Promise((resolve, reject) => {
    const cities = City.find({}).lean();
    cities
      .then(cities =>
        resolve(
          cities.map(city => {
            const {
              _id: id,
              markerOffset,
              name,
              coordinates,
              ip,
              status,
            } = city;
            return {
              id,
              markerOffset,
              name,
              coordinates,
              ip,
              status,
            };
          })
        )
      )
      .catch(err => reject(err));
  });
}

async function getCitiesInfo(city, start, end) {
  return new Promise((resolve, reject) => {
    const currentKey = `${city.toString()}.${Math.round(
      start / (1000 * 60)
    ).toString()}.${Math.round(end / (1000 * 60)).toString()}`;
    // console.log(currentKey);
    clientRedis.getAsync(currentKey).then(res => {
      // console.log('in redis');
      // console.log(res);
      if (res === null) {
        getAllCities().then(cities => {
          getDataOneCity(cities[city], start, end)
            .then(resSecond => {
              // cache it
              clientRedis.set(
                currentKey,
                JSON.stringify(resSecond),
                'EX',
                60 * 30
              );
              // clientRedis.getAsync(currentKey).then(ress => {
              //   console.log('in redis after');
              //   // console.log(ress);
              //   console.log(JSON.parse(ress));
              // });
              // console.log(resSecond);
              resolve(resSecond);
            })
            .catch(err => reject(err));
        });
      } else {
        // cache
        console.log('get from cache..');
        resolve(JSON.parse(res));
      }
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
// const opts = {
//   "type": "unicode"
// }
//   const from = 'Nexmo'
//   const to = toSMS
//   const text = content
//   console.log("====>>>> xen co gui sms ko");
//   nexmo.message.sendSms(from, to, text,opts)
//   return true;
// }
// Send SMS by Dcom
async function sendSMS(toSMS, content) {
  const { exec } = require('child_process');

  let res = 'python src/server/users/SendSMS.py ';
  res = `${res + toSMS.toString()} ` + `"${content}"`;
  const { stdout, stderr } = await exec(res);
  return true;
}
async function getData(data) {
  const strFake = {
    columns: ['Time', 'Computer', 'Content', 'Status'],
    data: [
      [
        '2019-03-04',
        'Number 01',
        'Mã độc mirai đang tấn công máy chủ Hà Nội',
        'NY',
      ],
      ['2019-03-03', 'Number 02', 'Bashlite is attacking your system', 'CT'],
      ['2019-03-02', 'Number 03', 'Mirai is attacking your system', 'FL'],
      ['2019-03-01', 'Number 04', 'Trojan is attacking your system', 'TX'],
    ],
  };
  return strFake;
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
  return Log.find({}).lean();
}

async function checkPwd(obj) {
  const ret = 0;
  const { sub: id, dat } = obj;
  return User.findById(id)
    .lean()
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
  return User.findById(_id).lean();
}

async function getUsers() {
  return User.find({}).lean();
}

async function addDb(obj) {
  if (!obj || !('username' in obj) || !('role' in obj)) return 0;
  // to lowercase;
  obj.username = obj.username.toString().toLowerCase();
  obj.role = obj.role.toString().toLowerCase();

  return User.find({ username: obj.username })
    .lean()
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
        .lean()
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
  return User.findByIdAndRemove(id).lean();
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
          .lean()
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
  }).lean();
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
