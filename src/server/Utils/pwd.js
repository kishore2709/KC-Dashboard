const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = '2';

const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

module.exports = hash;
