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
  const user1 = new User({
    username: 'user',
    password: md5('user'),
    role: 'User',
    status: true,
    permissions: {
      dashboard: { canAccess: true, subArr: [true, false, false] },
      user: { canAccess: true, subArr: [true, false] },
      permission: { canAccess: true, subArr: [true, false] },
      logManager: { canAccess: true, subArr: [true, false] },
      serviceManager: { canAccess: true, subArr: [true, false] },
      attackReport: { canAccess: true, subArr: [true, false] },
      alert: { canAccess: true, subArr: [true, false] },
    },
  });
  user1.save((err, user1) => {
    if (err) console.log(err);
    console.log('save ok');
  });
});
// console.log('end');
