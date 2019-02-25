const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const ip = require('../Utils/ListIpAddress');

mongoose.connect(ip.db);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const saltRounds = 10;
const myPlaintextPassword = '1';
const Schemas = require('../Utils/Schema');
const UserSchema = Schemas.UserSchema;
const User = mongoose.model('User', UserSchema);
User.find({}, (err, docs) => {
    console.log(err, docs);
})