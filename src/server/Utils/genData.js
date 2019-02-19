const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = '1';
const Models = require('../Utils/Schema');

mongoose.connect('mongodb://localhost/usermanager');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const User = Models.User;
const Group = Models.Group;
db.once('open', () => {
  // we're connected!
  console.log('connected to database..');
  bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    const userData = [
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
        permissions: {
          dashboard: {
            canAccess: true,
            subArr: [true, true, true],
          },
          aiml: {
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
    const groupData = [
      {
        groupname: 'admin',
      },
      {
        groupname: 'moderator',
      },
      {
        groupname: 'user',
      },
    ];
    const users = userData.map(user => new User(user));
    users.map(user =>
      user.save((err, user1) => {
        if (err) console.log(err);
        console.log('save ok');
      })
    );
    const groups = groupData.map(group => new Group(group));
    groups.map(group =>
      group.save((err, groupNew) => {
        if (err) console.log(err);
        console.log('save group ok');
      })
    );
  });
});
// console.log('end');
