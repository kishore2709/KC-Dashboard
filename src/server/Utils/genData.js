const mongoose = require('mongoose');
const Models = require('../Utils/Schema');
const ip = require('../Utils/ListIpAddress');

const { User, Group, City, DnsLog, WebLog, Report } = Models;
// connect db
mongoose.connect(ip.db);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// get Data
const citiesData = require('./data/cities');
const usersData = require('./data/users');
const groupsData = require('./data/groups');
const reportsData = require('./data/reports');
const chartData = require('../../client/_helpers/Utils/genChartData.js');

async function addLogData(cities, index) {
  console.log('Start adding data in threat', index);
  let cur = new Date(2019, 0, 1)
  for (let i = 1; i <= 1000000; i++) {
    cur = new Date(cur.getTime() + Math.random() * 60 * 1000);
    const dns = new DnsLog({
      city: cities[i % 3]._id,
      timestamp: cur,
      count: Math.round(Math.random() * 1000 + 1),
    });
    cur = new Date(cur.getTime() + Math.random() * 60 * 1000);
    const web = new WebLog({
      city: cities[i % 3]._id,
      timestamp: cur,
      count: Math.round(Math.random() * 1000 + 1),
    });
    await Promise.all([dns.save(), web.save()]);
    if (i % 1000 === 0) console.log(`Threat ${index}: ${i / 10000}% completed`);
  }
  return Promise.resolve(1);
}

async function deleteCollection() {
  const promises = [User, Group, City, DnsLog, WebLog, Report].map(async (val) => {
    await val.collection.drop();
  });
  await Promise.all(promises);
  console.log('Drop collections done!');
}

db.once('open', () => {
  // we're connected!
  console.log('connected to database..');
  console.log('Drop old Collection..');

  // console.log(citiesData);
  // user
  const users = usersData.map(val => new User(val));
  users.map(user =>
    user.save((err, user1) => {
      if (err) console.log(err);
      console.log('save user ok');
    })
  );
  // group
  const groups = groupsData.map(val => new Group(val));
  groups.map(group =>
    group.save((err, groupNew) => {
      if (err) console.log(err);
      console.log('save group ok');
    })
  );
  console.log('Adding 3 millions of log datas in 3s');
  const cities = citiesData.map(city => new City(city));
  cities.map((city, index) =>
    city.save((err, city1) => {
      if (err) console.log(err);
      console.log('save city ok');

      // report
      const reports = reportsData.map(val => {
        const report = { city: city1._id, ...val };
        return new Report(report);
      });
      reports[index].save((err, reportNew) => {
        if (err) console.log(err);
        console.log('save report ok');
      })
      /*
      // dnslog
      const dnsLogsData = chartData.generateData(2000).chartData;
      // console.log(dnsLogsData);
      const dnsLogs = dnsLogsData.map(({ x: timestamp, y: count }) => {
        const dnsLog = { city: city1._id, timestamp, count };
        return new DnsLog(dnsLog);
      });
      dnsLogs.map(dnsLog => {
        dnsLog.save((err, dnsLog1) => {
          if (err) console.log(err);
          console.log('save dnsLog ok', i);
        });
      });
      // weblog
      const webLogsData = chartData.generateData(2000).chartData;
      const webLogs = webLogsData.map(({ x: timestamp, y: count }) => {
        const webLog = { city: city1._id, timestamp, count };
        return new WebLog(webLog);
      });
      webLogs.map(webLog => {
        webLog.save((err, webLog1) => {
          if (err) console.log(err);
          console.log('save webLog ok', i);
        });
      });
      */
      setTimeout(() => addLogData(cities, index), 3000);
      // setTimeout(() => deleteCollection(), 3000);
    })
  );
});
// console.log('end');
