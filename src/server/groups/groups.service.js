const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config.json');
const Schemas = require('../Utils/Schema');
const GroupSchema = Schemas.GroupSchema;
// const GroupSchema = Schemas.GroupSchema;

// #### >>>  Init Mongodb
mongoose.connect('mongodb://localhost/Groupmanager');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const Group = mongoose.model('Group', GroupSchema);
// const Group = mongoose.model('Group', GroupSchema);
module.exports = {
  getGroups,
  updateDb,
  addDb,
}

async function addDb(obj) {
  let ret = 0;
  // console.log(obj);
  if (!obj || !('groupname' in obj)) return 0;
  // to lowercase;
  obj.groupname = obj.groupname.toString().toLowerCase();
  // check groupname exist?
  let tmpGroups;
  await Group.find({ groupname: obj.groupname }, (err, docs) => {
    tmpGroups = docs;
  });
  if (Array.isArray(tmpGroups) && tmpGroups.length > 0) return 0;

  // add Group to db
  const Group = new Group(obj);
  await new Promise(resolve =>
    Group.save((err, newGroup) => {
      if (err) {
        console.log('add db group err');
      } else {
        console.log('add group ok');
        ret = newGroup;
        resolve(ret);
      }
    })
  );
  // console.log('wtf');
  // console.log(ret);
  return ret;
}

async function getGroups() {
  let ret = 'err';
  await Group.find({}, (err, groups) => {
    if (err) console.log('get db groups error');
    else {
      console.log('get db groups ok');
      ret = [...groups];
    }
  });
  // console.log('wtf');
  // console.log(ret);
  return ret;
}

async function updateDb(objArr) {
  console.log(objArr);
  let ret = 1;
  console.log('???');
  for (const obj of objArr) {
    console.log(obj);
    if (!obj || !('id' in obj)) { ret = 0; continue };
    const { id, ...rest } = obj;
    await Group.findByIdAndUpdate(id, { $set: rest }, err => {
      if (err) { console.log('Update db group error'); ret = 0; }
      else {
        console.log('update group ok');
      }
    });
  }
  console.log('???');
  return ret;
}