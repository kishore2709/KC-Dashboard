const mongoose = require('mongoose');
const md5 = require('md5');

mongoose.connect('mongodb://localhost/usermanager');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  status: Boolean,
  accessArr: Array,
});
const User = mongoose.model('User', userSchema);

db.once('open', () => {
  // we're connected!
  console.log('connected to database..');
  const user1 = new User({
    username: 'dat',
    password: md5('dat'),
    role: 'User',
    status: false,
    accessArr: [true, false, true, true, false, false],
  });
  user1.save((err, user1) => {
    if (err) console.log(err);
    console.log('save ok');
  });
});
// console.log('end');
