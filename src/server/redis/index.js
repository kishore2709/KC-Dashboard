// redis
const redis = require('redis');

const clientRedis = redis.createClient();

module.exports = clientRedis;
