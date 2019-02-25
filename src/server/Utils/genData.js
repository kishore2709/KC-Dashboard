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

db.once('open', () => {
  // we're connected!
  console.log('connected to database..');
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
          // console.log('save dnsLog ok');
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
          // console.log('save webLog ok');
        });
      });
    })
  );
});
// console.log('end');
