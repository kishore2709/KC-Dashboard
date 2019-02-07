const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/usermanager');
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  fullname: String,
  email: String,
  phonenumber: String,
  status: Boolean,
  permissions: Object,
});
module.exports = UserSchema;
