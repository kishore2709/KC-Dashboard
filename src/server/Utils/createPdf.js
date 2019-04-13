// console.log(__dirname);
// console.log('???????????????');
const path = require('path');

const fonts = {
  Roboto: {
    normal: path.join(__dirname, 'examples/fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'examples/fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'examples/fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'examples/fonts/Roboto-MediumItalic.ttf'),
  },
};

const PdfPrinter = require('pdfmake');

// console.log('call on');
const printer = new PdfPrinter(fonts);
const fs = require('fs');

const createPdf = (title, webLog, dnsLog, sessionLog) =>
  new Promise((resolve, reject) => {
    const createdDate = new Date();
    const docDefinition = {
      pageSize: 'A2',
      pageOrientation: 'landscape',
      content: [
        { text: title, style: 'header' },
        `Ngày ${createdDate.getDate()} tháng ${createdDate.getMonth()} năm ${createdDate.getFullYear()}`,
        { text: 'Web Log', style: 'subheader' },
        {
          style: 'tableExample',
          table: {
            body: webLog,
          },
        },
        { text: 'Dns Log', style: 'subheader' },
        {
          style: 'tableExample',
          table: {
            body: dnsLog,
          },
        },
        { text: 'Session Log', style: 'subheader' },
        {
          style: 'tableExample',
          table: {
            body: sessionLog,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
      },
      defaultStyle: {
        // alignment: 'justify'
      },
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    // const desPath = path.join(__dirname, `${title}.pdf`);
    // pdfDoc.pipe(fs.createWriteStream(desPath));
    // pdfDoc.end(desPath);
    const chunks = [];
    let result;
    pdfDoc.on('data', chunk => {
      chunks.push(chunk);
    });
    pdfDoc.on('end', () => {
      result = Buffer.concat(chunks);
      resolve(result)
      // resolve(`data:application/pdf;base64,${result.toString('base64')}`);
    });
    pdfDoc.end();
    // resolve(true);
  });

module.exports = createPdf;
