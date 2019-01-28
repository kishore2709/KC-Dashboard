let scalingFactor = (value) => {
  return Math.abs((value * 0.9) + (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 1000));
};
let randomDate = (start, end, jump, step) => {
  return new Date(start.getTime() + step * ((end.getTime() - start.getTime()) / jump));
}
let generateData = (count) => {
  var data = [];
  var y = 0;
  for (var i = 0; i < count; i++) {
      y = Math.round(scalingFactor(y));
      data.push({
          x: randomDate(new Date(2017, 0, 1), new Date(), 20000, i),
          y: y,
      });
  }
  return data;
};
// console.log(data)
export default generateData;