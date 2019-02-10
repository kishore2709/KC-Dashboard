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

// users hardcoded for simplicity, store in a db for production applications
const users = [
  {
    id: 1,
    username: 'test',
    password: 'test',
    firstName: 'Test',
    lastName: 'User',
  },
  {
    id: 1,
    username: 'admin',
    password: '21232f297a57a5a743894a0e4a801fc3',
    firstName: 'admin',
    lastName: 'admin',
  },
];

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
  console.log(obj);
  const { sub: id, dat } = obj;
  await User.findById(id, (err, users) => {
    if (err) console.log('get db checkpwd users error');
    else {
      console.log('get db checkpwd users ok');
      console.log(users);
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
  console.log(_id);
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
          const { password, ...userWithoutPassword } = user;
          console.log({
            ...userWithoutPassword,
            token,
          });
          resolve({
            ...userWithoutPassword,
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
  return ret;
}

async function changePassword(obj) {
  let ret = 0;
  // console.log(obj);
  const { id, password, ...rest } = obj;
  // console.log(password);
  // console.log('hellll?');
  // console.log(_id);
  // console.log(rest);
  // console.log(_id, rest);
  await User.findByIdAndUpdate(id, { $set: { ...rest, password } }, err => {
    if (err) console.log('Change pwd error');
    else {
      console.log('Change pwd ok');
      ret = 1;
    }
  });
  return ret;
}
