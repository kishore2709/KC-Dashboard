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
};

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
  /*
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    // console.log('match?/');
    const token = jwt.sign({ sub: user.id }, config.secret);
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    };
  }
  */
  const tmpFunction = function findDb() {
    return new Promise((resolve, reject) => {
      User.find({ username, password }, (err, docs) => {
        if (err) console.log(err);
        else {
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
          const token = jwt.sign(
            {
              sub: user.id,
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
        }
      });
    });
  };
  return tmpFunction();
}

async function getAll() {
  return users.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}
