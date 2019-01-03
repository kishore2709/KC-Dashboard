const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config.json');

// #### >>>  Init Mongodb
mongoose.connect('mongodb://localhost/usermanager');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  status: Boolean,
});
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
    password: 'admin',
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
};

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
        console.log(ret);
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
async function updateDb(obj) {
  const { id, ...rest } = obj;
  let ret = 0;
  console.log(id, rest);
  await User.findByIdAndUpdate(id, rest, err => {
    if (err) console.log('Update db error');
    else {
      console.log('update ok');
      ret = 1;
    }
  });
  return ret;
}

async function authenticate({ username, password }) {
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
}

async function getAll() {
  return users.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}
