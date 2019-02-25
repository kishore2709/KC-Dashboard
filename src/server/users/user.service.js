const jwt = require('jsonwebtoken');
const config = require('../config.json');
const Models = require('../Utils/Schema');
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
};

async function getCitiesInfo() {
  let cities;
  await City.find({}, (err, ret) => {
    if (!err) cities = ret;
  });
  console.log('in cities', cities);
  if (!cities || !Array.isArray(cities)) return false;
  const result = [];
  for (let i = 0; i < cities.length; i++) {
    let dnslogs;
    let weblogs;
    let reports;
    const { _id: id, markerOffset, name, coordinates, ip, status } = cities[i];
    await DnsLog.find({ city: id }, (err, ret) => {
      if (!err) dnslogs = ret;
    });
    await WebLog.find({ city: id }, (err, ret) => {
      if (!err) weblogs = ret;
    });
    await Report.find({ city: id }, (err, ret) => {
      if (!err) reports = ret;
    });
    result.push({
      dnslogs,
      weblogs,
      reports,
      id,
      markerOffset,
      name,
      coordinates,
      ip,
      status,
    });
  }
  return result;
}
/// Send Email
async function sendEmails(toEmails, subject, content, html) {
  let credentials = {
    user: "devpython.dat@gmail.com",
    pass: "dat182980",
    to: toEmails
  };
  let result = false;
  var send = await require("gmail-send")({
    user: credentials.user, // Your GMail account used to send emails
    pass: credentials.pass, // Application-specific password
    to: credentials.to,
    subject: subject,
    text: content,
    //html: html
  });
  var filepath = './demo_attachment.txt';
  console.log("=======>>>> xem server co nhan chua", toEmails);
  return new Promise((resolve, reject) => {
    send({
    }, function (err, res) {
      console.log(
        "Loi gui email la:",
        err,
        "; ket qua la",
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

async function saveLog(obj) {
  if (
    !obj ||
    !('username' in obj) ||
    !('timestamp' in obj) ||
    !('status' in obj) ||
    !('isLogin' in obj) ||
    !('ip' in obj)
  )
    return 0;
  let { username, timestamp, status, isLogin, ip } = obj;
  username = username.toString().toLowerCase();
  const log = new Log({ username, timestamp, status, isLogin, ip });
  let ret = 0;
  await new Promise(resolve =>
    log.save((err, newLog) => {
      // console.log(err, newLog);
      if (err) {
        console.log('add db log err');
      } else {
        console.log('add log ok');
        ret = 1;
        resolve(ret);
      }
    })
  );
  return ret;
}

async function getLog(obj) {
  let ret = 0;
  await Log.find({}, (err, logs) => {
    if (err) console.log('get db logs error');
    else {
      console.log('get db logs ok');
      ret = [...logs];
    }
  });
  return ret;
}

async function checkPwd(obj) {
  let ret = 0;
  // console.log('in CheckPwd async');
  // console.log(obj);
  const { sub: id, dat } = obj;
  console.log(id, dat);
  await User.findById(id, (err, users) => {
    if (err) console.log('get db checkpwd users error');
    else {
      // console.log('get db checkpwd users ok');
      // console.log(dat);
      // console.log(users);
      if (!users || !('password' in users)) {
        ret = 0;
        return 0;
      }
      if (users.password === dat) ret = 1;
    }
  });
  return ret;
}

async function dashboardData() {
  return dashboardService;
}

async function getUserInfo(obj) {
  const { _id, ...rest } = obj;
  let ret = 'err';
  // console.log(obj);
  console.log(' in get UserInfo');
  console.log(_id);
  await User.findById(_id, (err, users) => {
    if (err) console.log('get db users error');
    else {
      console.log('get db users ok');
      // console.log(users);
      ret = users;
    }
  });
  console.log('wtf');
  console.log(ret);
  return ret;
}

async function getUsers() {
  let ret = 'err';
  await User.find({}, (err, users) => {
    if (err) console.log('get db users error');
    else {
      console.log('get db users ok');
      ret = [...users];
    }
  });
  // console.log('wtf');
  // console.log(ret);
  return ret;
}

async function addDb(obj) {
  let ret = 0;
  // console.log(obj);
  if (!obj || !('username' in obj) || !('role' in obj)) return 0;

  // to lowercase;
  obj.username = obj.username.toString().toLowerCase();
  obj.role = obj.role.toString().toLowerCase();
  // check Username exist?
  let tmpUsers;
  await User.find({ username: obj.username }, (err, docs) => {
    tmpUsers = docs;
  });
  if (Array.isArray(tmpUsers) && tmpUsers.length > 0) return 0;

  // check role - groupname exist ? -> set Permission Group for user
  let groupUserPermission;
  await Group.find({ groupname: obj.role }, (err, docs) => {
    if (err) return 0;
    if (docs.length === 0) return;
    groupUserPermission = docs[0].permissions;
  });

  // add User to db
  const user = new User({ ...obj, permissions: groupUserPermission });
  await new Promise(resolve =>
    user.save((err, newUser) => {
      if (err) {
        console.log('add db err');
      } else {
        console.log('add ok');
        ret = newUser;
        resolve(ret);
      }
    })
  );
  // console.log('wtf');
  // console.log(ret);
  return ret;
}

async function deleteDb(obj) {
  if (!obj || !('id' in obj)) return 0;
  const { id, ...rest } = obj;
  let ret = 0;
  console.log(id, rest);
  await User.findByIdAndRemove(id, err => {
    if (err) console.log(err);
    else {
      console.log('Delete ok');
      ret = 1;
    }
  });
  return ret;
}
async function updateDb(objArr) {
  let ret = 0;
  // console.log(objArr);
  for (const obj of objArr) {
    // check error
    if (!obj || !('username' in obj) || !('id' in obj)) return 0;
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
    console.log(rest);
    await User.findByIdAndUpdate(id, { $set: rest }, err => {
      if (err) console.log('Update db error');
      else {
        console.log('update ok');
        ret = 1;
      }
    });
  }
  return ret;
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
  let ret = 0;
  let { id, password, ...rest } = obj;
  password = defaultPassword;
  await User.findByIdAndUpdate(
    id,
    { $set: { ...rest, password, changePwd: true } },
    err => {
      if (err) console.log('Reset pwd error');
      else {
        console.log('reset pwd ok');
        ret = 1;
      }
    }
  );
  return ret;
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
