const Schemas = require('../Utils/Schema');

const { Group } = Schemas;
// const GroupSchema = Schemas.GroupSchema;
// #### >>>  Init Mongodb
module.exports = {
  getGroups,
  updateDb,
  addDb,
};

async function addDb(obj) {
  // let ret = 0;
  // console.log(obj);
  if (!obj || !('groupname' in obj)) return 0;
  // to lowercase;
  obj.groupname = obj.groupname.toString().toLowerCase();
  // check groupname exist?
  let tmpGroups;
  // await
  return new Promise((resolve, reject) => {
    Group.find({ groupname: obj.groupname })
      .exec()
      .then(tmpGroups => {
        if (Array.isArray(tmpGroups) && tmpGroups.length > 0) reject(0);
        // add Group to db
        const mGroup = new Group(obj);
        mGroup.save((err, newGroup) => {
          if (err) {
            reject('add db group err');
          } else {
            // console.log('add group ok');
            // ret = newGroup;/
            resolve(newGroup);
          }
        });
      });
  });
}

async function getGroups() {
  return Group.find({}).exec();
}

async function updateDb(objArr) {
  for (const obj of objArr) {
    if (!obj || !('id' in obj)) {
      continue;
    }
    const { id, ...rest } = obj;
    await Group.findByIdAndUpdate(id, { $set: rest }).exec();
  }
}
