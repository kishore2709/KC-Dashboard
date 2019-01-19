const mongoose = require('mongoose');
const md5 = require('md5');
const UserSchema = require('../Utils/Schema');

mongoose.connect('mongodb://localhost/usermanager');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const userSchema = UserSchema;
const User = mongoose.model('User', userSchema);

db.once('open', () => {
  // we're connected!
  console.log('connected to database..');
  const userData = [
    {
      username: 'User 1',
      password: md5('1'),
      role: 'User',
      status: true,
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
      username: 'User 2',
      password: md5('1'),
      role: 'User',
      status: true,
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
      username: 'User 3',
      password: md5('1'),
      role: 'User',
      status: true,
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
      username: 'User 4',
      password: md5('1'),
      role: 'User',
      status: true,
      permissions: {
        dashboard: {
          canAccess: true,
          subArr: [true, true, false],
        },
        user: {
          canAccess: true,
          subArr: [true, false, false],
        },
        permission: {
          canAccess: false,
          subArr: [true, false],
        },
        logManager: {
          canAccess: false,
          subArr: [true, false],
        },
        serviceManager: {
          canAccess: true,
          subArr: [true, false, false, true],
        },
        attackReport: {
          canAccess: false,
          subArr: [true, false],
        },

      },
    },
    {
      username: 'Moderator 1',
      password: md5('1'),
      role: 'Moderator',
      status: true,
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
      username: 'Admin 1',
      password: md5('1'),
      role: 'Admin',
      status: true,
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
          canAccess: true,
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
  ];
  const users = userData.map(user => new User(user));
  users.map(user =>
    user.save((err, user1) => {
      if (err) console.log(err);
      console.log('save ok');
    })
  );
  const user1 = new User({
    username: 'Admin',
    password: md5('Admin'),
    role: 'Admin',
    status: true,
    permissions: {
      dashboard: { canAccess: true, subArr: [true, false, false] },
      user: { canAccess: true, subArr: [true, false] },
      permission: { canAccess: true, subArr: [true, false] },
      logManager: { canAccess: true, subArr: [true, false] },
      serviceManager: { canAccess: true, subArr: [true, false] },
      attackReport: { canAccess: true, subArr: [true, false] },
    },
  });
  user1.save((err, user1) => {
    if (err) console.log(err);
    console.log('save ok');
  });
});
// console.log('end');
