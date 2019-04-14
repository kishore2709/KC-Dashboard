const express = require('express');

const router = express.Router();
const userService = require('./user.service');

function saveLog(req, res, next) {
  console.log('inSavelog');
  userService
    .saveLog({ ...req.body, ip: req.ipAddr })
    .then(ret => {
      if (!ret) {
        res.status(400).json({ message: 'saveLog error' });
      } else {
        res.json({ message: ret });
      }
    })
    .catch(err => next(err));
}

function getLog(req, res, next) {
  // console.log('??');
  userService
    .getLog(req.body)
    .then(ret => {
      if (!ret) {
        res.status(400).json({ message: 'getLog error' });
      } else {
        res.json({ message: ret });
      }
    })
    .catch(err => next(err));
}

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
router.post('/getCitiesInfo', getCitiesInfo);
router.post('/getCities', getCities);
router.post('/sendEmails', sendEmails);
router.post('/sendSMS', sendSMS);
router.post('/getData', getData);
// log
router.post('/getWebLogByTime', getWebLogByTime);
router.post('/getDNSLogByTime', getDNSLogByTime);
router.post('/getSessionLogByTime', getSessionLogByTime);
router.post('/downloadPdf', downloadPdf);
router.post('/downloadExcel', downloadExcel);
// router.post('/saveLog', saveLog);
module.exports = router;

function downloadExcel(req, res, next) {
  userService
    .downloadExcel()
    .then(binary => {
      res.send(binary);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}
// download pdf
function downloadPdf(req, res, next) {
  console.log('download ..');
  userService
    .downloadPdf()
    .then(binary => {
      res.contentType('application/pdf');
      res.send(binary);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}
// log
function getWebLogByTime(req, res, next) {
  // console.log(req.query.start);
  const startTime = new Date(req.query.startTime);
  const endTime = new Date(req.query.endTime);
  // conso
  const startIndex = parseInt(req.query.startIndex, 10);
  const endIndex = parseInt(req.query.endIndex, 10);
  userService
    .getWebLogByTime(startTime, endTime, startIndex, endIndex)
    .then(ret => {
      res.json({
        status: true,
        data: ret,
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function getSessionLogByTime(req, res, next) {
  const startTime = new Date(req.query.startTime);
  const endTime = new Date(req.query.endTime);
  const startIndex = parseInt(req.query.startIndex, 10);
  const endIndex = parseInt(req.query.endIndex, 10);
  userService
    .getSessionLogByTime(startTime, endTime, startIndex, endIndex)
    .then(ret => {
      res.json({
        status: true,
        data: ret,
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function getDNSLogByTime(req, res, next) {
  const startTime = new Date(req.query.startTime);
  const endTime = new Date(req.query.endTime);
  // console.log(startTime, '??', req.query.startTime);
  const startIndex = parseInt(req.query.startIndex, 10);
  const endIndex = parseInt(req.query.endIndex, 10);
  userService
    .getDNSLogByTime(startTime, endTime, startIndex, endIndex)
    .then(ret => {
      res.json({
        status: true,
        data: ret,
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function sendEmails(req, res, next) {
  userService
    .sendEmails(
      req.body.toEmails,
      req.body.subject,
      req.body.content,
      req.body.html
    )
    .then(ret => {
      if (ret === 0) {
        res.status(400).json({ message: 'saveLog error' });
      } else {
        res.json({ message: ret });
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function sendSMS(req, res, next) {
  userService
    .sendSMS(req.body.toSMS, req.body.content)
    .then(ret => {
      if (ret === 0) {
        res.status(400).json({ message: 'saveLog error' });
      } else {
        res.json({ message: ret });
      }
    })
    .catch(err => next(err));
}
function getData(req, res, next) {
  userService
    .getData(req.body)
    .then(ret => {
      if (!ret) {
        res.status(400).json({ message: 'saveLog error' });
      } else {
        res.json({ message: ret });
      }
    })
    .catch(err => next(err));
}

function getCitiesInfo(req, res, next) {
  const start = new Date(parseInt(req.query.start, 10));
  const end = new Date(parseInt(req.query.end, 10));
  const city = parseInt(req.query.city, 10);
  Promise.all([
    userService.getCitiesInfo(city, start, end),
    userService.getAllCities(),
  ])
    .then(ret => {
      if (!ret || !ret[0] || !ret[1]) {
        res.status(400).json({ message: 'getCity error' });
      } else {
        res.json({ message: ret[0], cities: ret[1] });
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function getCities(req, res, next) {
  userService
    .getAllCities()
    .then(ret => {
      if (!ret) {
        res.status(400).json({ message: 'getCity error' });
      } else {
        res.json({ message: ret });
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
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
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function resetPassword(req, res, next) {
  userService
    .resetPassword(req.body)
    .then(ret => {
      if (!ret) {
        res.status(400).json({ message: 'reset pwd error' });
      } else {
        res.json({ message: 'ok' });
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
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
        .catch(err => {
          console.log(err);
          next(err);
        });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });

  // console.log('in dashboard data controlller');
}
function getUserInfo(req, res, next) {
  // console.log('in getUserInfo');
  // console.log(req.user);
  userService
    .getUserInfo(req.body)
    .then(ret => {
      // console.log(ret);
      if (!ret) {
        res.status(400).json({ message: 'find userinfo in db error' });
      } else {
        // console.log(ret);
        res.json(ret);
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function addDb(req, res, next) {
  userService
    .addDb(req.body)
    .then(ret => {
      console.log(' in add Dbbbbbbbbbbbbbbbbb');
      if (!ret) {
        res.status(400).json({ message: 'add db error' });
      } else {
        console.log(ret);
        res.json(ret);
      }
    })
    .catch(err => {
      console.log('???', err);
      next(err);
    });
}

function deleteDb(req, res, next) {
  userService
    .deleteDb(req.body)
    .then(ret => {
      if (!ret) {
        res.status(400).json({ message: 'delete db error' });
      } else {
        res.json({ message: 'ok' });
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
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
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function updateDb(req, res, next) {
  userService
    .updateDb(req.body)
    .then(ret => {
      if (!ret) {
        res.status(400).json({ message: 'update db error' });
      } else {
        res.json({ message: 'ok' });
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user !== false
        ? res.json(user)
        : res.status(400).json({ message: 'Username or password is incorrect' })
    )
    .catch(err => {
      console.log(err);
      next(err);
    });
}

function getAll(req, res, next) {
  // console.log(req.user);
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => {
      console.log(err);
      next(err);
    });
}

// // routes
// router.post('/authenticate', authenticate);
// router.get('/getAll', getAll);
// router.post('/updateDb', updateDb);
// router.post('/getUsers', getUsers);
// router.post('/deleteDb', deleteDb);
// router.post('/addDb', addDb);
// router.post('/getUserInfo', getUserInfo);
// router.post('/dashboardData', dashboardData);
// router.post('/resetPassword', resetPassword);
// router.post('/changePassword', changePassword);
// router.post('/getCitiesInfo', getCitiesInfo);
// router.post('/sendEmails', sendEmails);
// router.post('/getLog', getLog);
// router.post('/saveLog', saveLog);
// router.post('/getCities', getCities);
// // router.post('/saveLog', saveLog);
// module.exports = router;
