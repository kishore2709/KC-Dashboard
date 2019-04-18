const bcrypt = require('bcrypt');

const saltRounds = 10;
// const myPlaintextPassword = '1';

const hash = myPlaintextPassword => bcrypt.hashSync(myPlaintextPassword, 10);

module.exports = hash;
