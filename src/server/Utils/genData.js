const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = '1';
const Schemas = require('../Utils/Schema');
const UserSchema = Schemas.UserSchema;
const GroupSchema = Schemas.GroupSchema;

mongoose.connect('mongodb://localhost/usermanager');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const userSchema = UserSchema;
const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', GroupSchema);
db.once('open', () => {
  // we're connected!
  console.log('connected to database..');
  bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    const userData = [
      {
        username: 'user',
        password: hash,
        role: 'User',
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
        role: 'Moderator',
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
        role: 'Admin',
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
    const groupData = [{
      groupname: 'admin',
    },
    {
      groupname: 'moderator',
    },
    {
      groupname: 'user',
    },
    ]
    const users = userData.map(user => new User(user));
    users.map(user =>
      user.save((err, user1) => {
        if (err) console.log(err);
        console.log('save ok');
      })
    );
    const groups = groupData.map(group => new Group(group));
    groups.map(group => group.save((err, groupNew) => {
      if (err) console.log(err);
      console.log('save group ok');
    }));
  });
});
// console.log('end');
