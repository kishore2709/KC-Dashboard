const randomValue = () => Math.round(Math.random() * 1000 + 1);

const randomDate = start => new Date(start.getTime() + (Math.random() + 1) * 60 * 60 * 1000);

const generateData = count => {
  let data = [];
  let curDate = new Date(2018, 0, 1);
  for (let i = 0; i < count; i++) {
    curDate = randomDate(curDate);
    data.push({
      x: curDate,
      y: randomValue(),
    });
  }
  return data;
};

const data = generateData(20000);

export default data;