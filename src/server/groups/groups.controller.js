const express = require('express');

const router = express.Router();
const groupService = require('./groups.service');

// routes
router.post('/updateDb', updateDb);
router.post('/getGroups', getGroups);
router.post('/addDb', addDb);
module.exports = router;

function addDb(req, res, next) {
  groupService
    .addDb(req.body)
    .then(ret => {
      // console.log(ret);
      if (ret === 0) {
        res.status(400).json({ message: 'delete db group error' });
      } else {
        // console.log(ret);
        res.json(ret);
      }
    })
    .catch(err => next(err));
}
function getGroups(req, res, next) {
  groupService
    .getGroups()
    .then(ret => {
      if (ret === 'err')
        res.status(400).json({ message: 'get db groups error' });
      else {
        res.json(ret);
      }
    })
    .catch(err => next(err));
}

function updateDb(req, res, next) {
  // console.log(req.body);
  groupService
    .updateDb(req.body)
    .then(ret => {
      if (ret === 0) {
        res.status(400).json({ message: 'update db groups error' });
      } else {
        res.json({ message: 'ok' });
      }
    })
    .catch(err => next(err));
}