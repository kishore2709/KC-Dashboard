const x = new Promise(resolve => {
  setTimeout(() => {
    resolve('Ok');
  }, 3000);
});
console.log(x);
