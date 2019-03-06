Promise.resolve('f')
    // 1. Receive "foo", concatenate "bar" to it, and resolve that to the next then
    .then(function (string) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                string += 'bar';
                resolve(string);
            }, 6300);
        });
    })
    // 2. receive "foobar", register a callback function to work on that string
    // and print it to the console, but not before returning the unworked on
    // string to the next then
    .then(function (string) {
        console.log(string);
    })

// logs, in order:
// Last Then: oops... didn't bother to instantiate and return a promise in the prior then so the sequence may be a bit surprising
// foobar
// foobarbaz
