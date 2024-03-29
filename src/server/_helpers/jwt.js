const expressJwt = require('express-jwt');
const config = require('../config.json');

module.exports = jwt;

function jwt() {
  const { secret } = config;
  return expressJwt({
    secret,
    getToken: function fromHeaderOrQuerystring(req) {
      // console.log('in queryyy jwt header');
      // console.log(req.headers.authorization);
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      }
      // console.log('in queryyy jwt');
      // console.log(req.query);
      if (req.query && req.query.token) {
        return req.query.token;
      }
      // console.log(req);
      // console.log('dident find token');
      return null;
    },
  }).unless({
    path: [
      // public routes that don't require authentication
      '/api/users/authenticate',
      '/api/users/saveLog',
    ],
  });
}
