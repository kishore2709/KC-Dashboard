const express = require('express');

const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/getAll', getAll);
router.post('/updateDb', updateDb);
router.post('/getUsers', getUsers);
router.post('/deleteDb', deleteDb);
router.post('/addDb', addDb);
router.post('/getUserInfo', getUserInfo);
router.post('/dashboardData', dashboardData);
router.post('/resetPassword', resetPassword);
router.post('/changePassword', changePassword);
router.post('/sendEmails', sendEmails);
// router.post('/saveLog', saveLog);
module.exports = router;

function sendEmails(req, res, next) {
  userService
    .sendEmails(req.body.toEmails,req.body.subject,
      req.body.content,req.body.html)
    .then(ret => {
      if (ret === 0) {
        res.status(400).json({ message: 'saveLog error' });
      } else {
        res.json({ message: ret });
      }
    })
    .catch(err => next(err));
}

function saveLog(req, res, next) {
  userService
    .saveLog({ ...req.body, ip: req.ipAddr })
    .then(ret => {
      if (ret === 0) {
        res.status(400).json({ message: 'saveLog error' });
      } else {
        res.json({ message: ret });
      }
    })
    .catch(err => next(err));
}

function getLog(req, res, next) {
  userService
    .getLog(req.body)
    .then(ret => {
      if (ret === 0) {
        res.status(400).json({ message: 'getLog error' });
      } else {
        res.json({ message: ret });
      }
    })
    .catch(err => next(err));
}

function changePassword(req, res, next) {
  userService
    .changePassword(req.body)
    .then(ret => {
      if (ret === 0) {
        res.status(400).json({ message: 'changePassword pwd error' });
      } else {
        res.json({ message: ret });
      }
    })
    .catch(err => next(err));
}

function resetPassword(req, res, next) {
  userService
    .resetPassword(req.body)
    .then(ret => {
      if (ret === 0) {
        res.status(400).json({ message: 'reset pwd error' });
      } else {
        res.json({ message: 'ok' });
      }
    })
    .catch(err => next(err));
}

function dashboardData(req, res, next) {
  // console.log(req.user);
  userService
    .getUserInfo({ _id: req.user.sub })
    .then(ret => {
      // console.log('in dashboardadata user info');
      // console.log(ret.permissions.dashboard);
      userService
        .dashboardData()
        .then(arrData => {
          // console.log(arrData);
          if (!arrData) {
            res.status(400).json({ message: 'find dashboardData error' });
          } else {
            // console.log('wtf');
            // console.log(arrData);
            const jsonRes = Object.keys(arrData).filter(
              (val, index) =>
                // console.log('??');
                // console.log(ret.permissions.dashboard.subArr[index]);
                ret.permissions.dashboard.subArr[index]
            );
            // console.log(jsonRes);
            const jsonAns = jsonRes.map(val =>
              // console.log(val);
              ({ [val]: arrData[val] })
            );
            res.json(jsonAns);
          }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));

  // console.log('in dashboard data controlller');
}
function getUserInfo(req, res, next) {
  // console.log('in getUserInfo');
  // console.log(req.user);
  userService
    .getUserInfo(req.body)
    .then(ret => {
      // console.log(ret);
      if (ret === 0) {
        res.status(400).json({ message: 'find userinfo in db error' });
      } else {
        // console.log(ret);
        res.json(ret);
      }
    })
    .catch(err => next(err));
}
function addDb(req, res, next) {
  userService
    .addDb(req.body)
    .then(ret => {
      // console.log(ret);
      if (ret === 0) {
        res.status(400).json({ message: 'delete db error' });
      } else {
        // console.log(ret);
        res.json(ret);
      }
    })
    .catch(err => next(err));
}
function deleteDb(req, res, next) {
  userService
    .deleteDb(req.body)
    .then(ret => {
      if (ret === 0) {
        res.status(400).json({ message: 'delete db error' });
      } else {
        res.json({ message: 'ok' });
      }
    })
    .catch(err => next(err));
}
function getUsers(req, res, next) {
  userService
    .getUsers()
    .then(ret => {
      if (ret === 'err')
        res.status(400).json({ message: 'get db users error' });
      else {
        res.json(ret);
      }
    })
    .catch(err => next(err));
}

function updateDb(req, res, next) {
  userService
    .updateDb(req.body)
    .then(ret => {
      if (ret === 0) {
        res.status(400).json({ message: 'update db error' });
      } else {
        res.json({ message: 'ok' });
      }
    })
    .catch(err => next(err));
}

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user !== false
        ? res.json(user)
        : res.status(400).json({ message: 'Username or password is incorrect' })
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  // console.log(req.user);
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}
