const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const defaultPassword = require('./pwd');

mongoose.connect('mongodb://localhost/usermanager');
const UserSchema = new mongoose.Schema({
  username: String,
  password: { type: String, default: defaultPassword },
  role: String,
  fullname: String,
  email: String,
  phonenumber: String,
  status: Boolean,
  changePwd: {
    type: Boolean,
    default: true
  },
  permissions: {
    type: Object,
    default: {
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
});

const LogSchema = new mongoose.Schema({
  timestamp: Date,
  isLogin: Boolean,
  username: String,
  status: Boolean,
  ip: String,
});

const GroupSchema = new mongoose.Schema({
  groupname: String,
  permissions: {
    type: Object,
    default: {
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
});
module.exports = { UserSchema, LogSchema, GroupSchema };
