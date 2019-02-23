const hash = require('../pwd');

const users = [
  {
    username: 'user',
    password: hash,
    role: 'user',
    status: true,
    fullname: 'ABC',
    email: 'ABC@gmail.com',
    phonenumber: '01632653333',
    changePwd: false,
  },
  {
    username: 'mod',
    password: hash,
    role: 'moderator',
    fullname: 'ABC',
    email: 'ABC@gmail.com',
    phonenumber: '01632653333',
    status: true,
    changePwd: false,
  },
  {
    username: 'admin',
    password: hash,
    role: 'admin',
    fullname: 'ABC',
    email: 'ABC@gmail.com',
    phonenumber: '01632653333',
    status: true,
    changePwd: false,
  },
];

module.exports = users;
