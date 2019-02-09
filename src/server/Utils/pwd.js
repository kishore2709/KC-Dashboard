const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = '1';

const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

module.exports = hash;
