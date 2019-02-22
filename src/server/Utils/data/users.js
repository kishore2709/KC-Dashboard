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
    permissions: {
      dashboard: {
        canAccess: true,
        subArr: [true, false, false],
      },
      user: {
        canAccess: true,
        subArr: [true, false],
      },
      permission: {
        canAccess: false,
        subArr: [true, false],
      },
      logManager: {
        canAccess: false,
        subArr: [false, false],
      },
      serviceManager: {
        canAccess: true,
        subArr: [true, false],
      },
      attackReport: {
        canAccess: false,
        subArr: [false, false],
      },
    },
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
    permissions: {
      dashboard: {
        canAccess: true,
        subArr: [true, false, false],
      },
      user: {
        canAccess: true,
        subArr: [true, false],
      },
      permission: {
        canAccess: false,
        subArr: [true, false],
      },
      logManager: {
        canAccess: true,
        subArr: [true, false],
      },
      serviceManager: {
        canAccess: true,
        subArr: [true, false],
      },
      attackReport: {
        canAccess: true,
        subArr: [true, false],
      },
    },
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
    permissions: {
      dashboard: {
        canAccess: true,
        subArr: [true, true, true],
      },
      user: {
        canAccess: true,
        subArr: [true, true],
      },
      permission: {
        canAccess: true,
        subArr: [true, true],
      },
      logManager: {
        canAccess: true,
        subArr: [true, true],
      },
      serviceManager: {
        canAccess: true,
        subArr: [true, true],
      },
      attackReport: {
        canAccess: true,
        subArr: [true, true],
      },
    },
  },
];

module.exports = users;
