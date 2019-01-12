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
});
const User = mongoose.model('User', userSchema);

db.once('open', () => {
  // we're connected!
  console.log('connected to database..');
  const user1 = new User({
    username: 'admin',
    password: md5('admin'),
    role: 'Admin',
    status: true,
  });
  user1.save((err, user1) => {
    if (err) console.log(err);
    console.log('save ok');
  });
});
// console.log('end');
