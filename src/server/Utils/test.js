var co = require('co');
co(function* () {
    var result = yield new Promise(resolve => {
        setTimeout(() => { resolve(1) }, 3000);
    });
    return result;
}).then(function (value) {
    console.log(value);
}, function (err) {
    console.error(err.stack);
});