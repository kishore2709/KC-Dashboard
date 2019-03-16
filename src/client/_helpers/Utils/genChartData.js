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
  const dataTable = [];
  const chartData = [];

  let curDate = new Date(2019, 0, 1);
  for (let i = 0; i < count; i++) {
    curDate = randomDate(curDate);
    dataTable.push([curDate.toISOString(), md5(randomString())]);
    chartData.push({
      x: curDate,
      y: randomValue(),
    });
  }
  return { dataTable, chartData };
};

const { dataTable, chartData } = generateData(2000);
// console.log(data);
const dnsData = [
  { "date": "22-Feb-2019", "time": "16:01:00.812", "c_ip": "192.168.0.57", "c_port": "47086", "query_name": "ocsp.digicert.com", "query_class": "IN", "query_type": "AAAA", "query_flags": "+" },
  { "date": "22-Feb-2019", "time": "16:01:55.857", "c_ip": "192.168.0.57", "c_port": "52956", "query_name": "incoming.telemetry.mozilla.org", "query_class": "IN", "query_type": "A", "query_flags": "+" },
  { "date": "22-Feb-2019", "time": "16:01:55.857", "c_ip": "192.168.0.57", "c_port": "52956", "query_name": "incoming.telemetry.mozilla.org", "query_class": "IN", "query_type": "AAAA", "query_flags": "+" },
  { "date": "22-Feb-2019", "time": "16:01:56.138", "c_ip": "192.168.0.57", "c_port": "43270", "query_name": "incoming.telemetry.mozilla.org", "query_class": "IN", "query_type": "A", "query_flags": "+T" },
  { "date": "22-Feb-2019", "time": "16:01:56.240", "c_ip": "192.168.0.57", "c_port": "43270", "query_name": "incoming.telemetry.mozilla.org", "query_class": "IN", "query_type": "AAAA", "query_flags": "+T" },
  { "date": "22-Feb-2019", "time": "16:01:56.290", "c_ip": "192.168.0.57", "c_port": "43209", "query_name": "detectportal.firefox.com", "query_class": "IN", "query_type": "A", "query_flags": "+" },
  { "date": "22-Feb-2019", "time": "16:01:56.290", "c_ip": "192.168.0.57", "c_port": "43209", "query_name": "detectportal.firefox.com", "query_class": "IN", "query_type": "AAAA", "query_flags": "+" },
  { "date": "22-Feb-2019", "time": "16:09:40.007", "c_ip": "192.168.0.57", "c_port": "33671", "query_name": "jmeter-plugins.org", "query_class": "IN", "query_type": "A", "query_flags": "+" },
  { "date": "22-Feb-2019", "time": "16:09:40.007", "c_ip": "192.168.0.57", "c_port": "33671", "query_name": "jmeter-plugins.org", "query_class": "IN", "query_type": "AAAA", "query_flags": "+" },
  { "date": "22-Feb-2019", "time": "16:15:46.988", "c_ip": "192.168.0.66", "c_port": "48730", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" },
  { "date": "22-Feb-2019", "time": "16:15:48.020", "c_ip": "192.168.0.66", "c_port": "48730", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" },
  { "date": "22-Feb-2019", "time": "16:15:49.545", "c_ip": "192.168.0.66", "c_port": "48730", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" },
  { "date": "22-Feb-2019", "time": "16:15:49.732", "c_ip": "192.168.0.66", "c_port": "36167", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" },
  { "date": "22-Feb-2019", "time": "16:15:50.984", "c_ip": "192.168.0.66", "c_port": "48730", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" },
  { "date": "22-Feb-2019", "time": "16:15:51.380", "c_ip": "192.168.0.66", "c_port": "40166", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" },
  { "date": "22-Feb-2019", "time": "16:15:52.013", "c_ip": "192.168.0.66", "c_port": "48730", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" },
  { "date": "22-Feb-2019", "time": "16:15:52.025", "c_ip": "192.168.0.66", "c_port": "40166", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" },
  { "date": "22-Feb-2019", "time": "16:15:52.043", "c_ip": "192.168.0.66", "c_port": "35620", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" },
  { "date": "22-Feb-2019", "time": "16:15:52.123", "c_ip": "192.168.0.66", "c_port": "36167", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" },
  { "date": "22-Feb-2019", "time": "16:15:52.160", "c_ip": "192.168.0.66", "c_port": "35620", "query_name": "api.twitter.com", "query_class": "IN", "query_type": "A", "query_flags": "-" }
].map(val =>
  Object.values(val)
);
const webData = [
  { "date": "2019-02-22", "time": "09:16:49", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "10" },
  { "date": "2019-02-22", "time": "09:16:49", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "10" },
  { "date": "2019-02-22", "time": "09:16:49", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "11" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "9" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "10" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "10" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "10" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "10" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "11" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "9" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "10" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "10" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "10" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "11" },
  { "date": "2019-02-22", "time": "09:16:50", "s_sitename": "W3SVC1", "s_computername": "WIN2008R2-TEST", "server_ip": "192.168.0.52", "cs_method": "GET", "cs_uri_stem": "/", "cs_uri_query": "-", "s_port": "80", "cs_username": "-", "c_ip": "192.168.0.66", "cs_version": "HTTP/1.1", "cs_User_Agent": "Apache-HttpClient/4.5.5+(Java/1.8.0_191)", "cs_cookie": "-", "cs_referer": "-", "cs_host": "192.168.0.52", "sc_status": "200", "sc_substatus": "0", "sc_win32_status": "0", "sc_bytes": "936", "cs_bytes": "116", "time_taken": "16" }
].map(val =>
  Object.values(val)
);

module.exports = { dataTable, chartData, generateData, dnsData, webData };
