const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config.json');
const UserSchema = require('../Utils/Schema');
// #### >>>  Init Mongodb
mongoose.connect('mongodb://localhost/usermanager');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const userSchema = UserSchema;
const User = mongoose.model('User', userSchema);
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
};

async function checkPwd(obj) {
  let ret = 0;
  console.log('in CheckPwd async');
  // console.log(obj);
  const { sub: id, dat } = obj;
  await User.findById(id, (err, users) => {
    if (err) console.log('get db checkpwd users error');
    else {
      console.log('get db checkpwd users ok');
      // console.log(users);
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
  // console.log(_id);
  await User.findById(_id, (err, users) => {
    if (err) console.log('get db users error');
    else {
      console.log('get db users ok');
      // console.log(users);
      ret = users;
    }
  });
  // console.log('wtf');
  // console.log(ret);
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
  const user = new User(obj);
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
  console.log('wtf');
  console.log(ret);
  return ret;
}
async function deleteDb(obj) {
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
  console.log(objArr);
  for (const obj of objArr) {
    // console.log(obj);
    const { id, ...rest } = obj;
    // console.log('hellll?');
    // console.log(_id);
    // console.log(rest);
    // console.log(_id, rest);
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

async function authenticate({ username, password }) {
  return new Promise((resolve, reject) => {
    User.find({ username }, (err, docs) => {
      // console.log(err);
      if (err) {
        console.log(err);
        reject(err);
      } else {
        // console.log('wtf');
        // console.log(docs);
        // console.log(docs.length);
        if (docs.length === 0) {
          reject(new Error('err'));
          return;
        }

        // console.log(docs.length);
        const user = docs[0];
        // console.log(user);
        bcrypt.compare(password, user.password, (err, res) => {
          // res == true

          if (err) reject(err);
          if (!res) resolve(false);
          const token = jwt.sign(
            {
              sub: user.id,
              dat: user.password,
              permissions: ['admin', 'user:read', 'user:write'],
            },
            config.secret
          );
          // console.log('before deconstruc.');
          // console.log(user);
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
          } = user;
          console.log({
            _id,
            username,
            role,
            fullname,
            email,
            phonenumber,
            status,
            token,
            permissions,
          });
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
  // console.log(obj);
  let { id, password, ...rest } = obj;
  password = defaultPassword;
  // console.log(password);
  // console.log('hellll?');
  // console.log(_id);
  // console.log(rest);
  // console.log(_id, rest);
  await User.findByIdAndUpdate(id, { $set: { ...rest, password } }, err => {
    if (err) console.log('Reset pwd error');
    else {
      console.log('reset pwd ok');
      ret = 1;
    }
  });
  console.log('after await');
  return ret;
}

async function changePassword(obj) {
  return new Promise((resolve, reject) => {
    const { id, oldPassword: password, newPassword } = obj;
    User.findById(id, (err, doc) => {
      if (err) reject(0);
      // if (!('password' in doc)) reject(0);
      // console.log(password, doc.password);
      bcrypt.compare(password, doc.password, (err, res) => {
        // res == true
        if (err) reject(0);
        // console.log(res);
        if (res == false) reject(0);
        else {
          let hashPass = bcrypt.hashSync(newPassword, saltRounds);
          User.findByIdAndUpdate(
            id,
            { $set: { password: hashPass } },
            err => {
              if (err) {
                console.log('Change pwd error');
                reject(0);
              } else {
                console.log('Change pwd ok');
                resolve(jwt.sign(
                  {
                    sub: id,
                    dat: hashPass,
                    permissions: ['admin', 'user:read', 'user:write'],
                  },
                  config.secret
                ));
              }
            });
        }
      });
    });
  });
}
