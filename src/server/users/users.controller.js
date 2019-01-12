const express = require('express');

const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);
router.post('/updateDb', updateDb);
router.post('/getUsers', getUsers);
router.post('/deleteDb', deleteDb);
router.post('/addDb', addDb);
module.exports = router;

function addDb(req, res, next) {
  userService
    .addDb(req.body)
    .then(ret => {
      // console.log(ret);
      if (ret === 0) {
        res.status(400).json({ message: 'delete db error' });
      } else {
        console.log(ret);
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
  // console.log('helsasdl');
  console.log(req.body);
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: 'Username or password is incorrect' })
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  console.log(req.user);
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}
