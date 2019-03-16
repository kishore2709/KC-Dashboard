const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const defaultPassword = require('./pwd');

const ObjectId = mongoose.Schema.Types.ObjectId;

// mongoose.connect('mongodb://localhost/usermanager');
const CitySchema = new mongoose.Schema({
  markerOffset: Number,
  name: String,
  coordinates: Array,
  ip: String,
  status: Boolean,
});
const ReportSchema = new mongoose.Schema({
  city: ObjectId,
  attacks: Number,
  pcaps: Number,
  logs: Number,
  bugs: Array,
  website: Array,
  server: Array,
});

const dnsLogSchema = new mongoose.Schema({
  city: ObjectId,
  timestamp: Date,
  count: Number,
});
const webLogSchema = new mongoose.Schema({
  city: ObjectId,
  timestamp: Date,
  count: Number,
});

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
    default: true,
  },
  permissions: {
    type: Object,
    default: {
      mailBox: {
        canAccess: true,
        subArr: [true, true, true],
      },
      exportData: {
        canAccess: true,
        subArr: [true, true, true],
      },
      dashboard: {
        canAccess: true,
        subArr: [true, true, true],
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

const GroupSchema = new mongoose.Schema({
  groupname: String,
  permissions: {
    type: Object,
    default: {
      mailBox: {
        canAccess: true,
        subArr: [true, true, true],
      },
      exportData: {
        canAccess: true,
        subArr: [true, true, true],
      },
      dashboard: {
        canAccess: true,
        subArr: [true, true, true],
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
  timestamp: String,
  isLogin: Boolean,
  username: String,
  status: Boolean,
  ip: String,
});

const User = mongoose.model('UserAccount', UserSchema);
const Group = mongoose.model('Group', GroupSchema);
const City = mongoose.model('City', CitySchema);
const Report = mongoose.model('Report', ReportSchema);
const DnsLog = mongoose.model('DnsLog', dnsLogSchema);
const WebLog = mongoose.model('WebLog', webLogSchema);
const Log = mongoose.model('LogInOut', LogSchema);

module.exports = { User, Group, City, DnsLog, WebLog, Report, Log };
