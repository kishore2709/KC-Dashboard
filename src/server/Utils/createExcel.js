const XLSX = require('xlsx');
const path = require('path');

const createExcel = (webLog, dnsLog, sessionLog) => {
  // webLog
  console.log(webLog);
  const wsWeb = XLSX.utils.json_to_sheet(webLog);
  const wsDNS = XLSX.utils.json_to_sheet(dnsLog);
  const wsSession = XLSX.utils.json_to_sheet(sessionLog);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, wsWeb, 'WebLog'); // sheetAName is name of Worksheet
  XLSX.utils.book_append_sheet(wb, wsDNS, 'DnsLog');
  XLSX.utils.book_append_sheet(wb, wsSession, 'SessionLog');
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  //   XLSX.writeFile(wb, path.resolve(__dirname, 'book.xlsx'));
};

module.exports = createExcel;
