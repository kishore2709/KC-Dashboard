// const momentRandom = require('moment-random');
const md5 = require('md5');

const randomValue = () => Math.round(Math.random() * 1000 + 1);

const randomDate = start =>
  new Date(start.getTime() + (Math.random() + 1) * 60 * 60 * 1000);
const randomString = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);
const generateData = count => {
  const data = [];
  const chartData = [];

  let curDate = new Date(2018, 0, 1);
  for (let i = 0; i < count; i++) {
    curDate = randomDate(curDate);
    data.push([curDate.toISOString(), md5(randomString())]);
    chartData.push({
      x: curDate,
      y: randomValue(),
    });
  }
  return { data, chartData };
};

const { data, chartData } = generateData(20000);
// console.log(data);

module.exports = { data, chartData };
