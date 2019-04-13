const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

const PdfPrinter = require('pdfmake');

const printer = new PdfPrinter(fonts);
const fs = require('fs');

const docDefinition = {
  content: [
    { text: 'Tables', style: 'header' },
    'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
    {
      text:
        'A simple table (no headers, no width specified, no spans, no styling)',
      style: 'subheader',
    },
    'The following table has nothing more than a body array',
    {
      style: 'tableExample',
      table: {
        body: [
          ['Column 1', 'Column 2', 'Column 3'],
          ['One value goes here', 'Another one here', 'OK?'],
        ],
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
pdfDoc.pipe(fs.createWriteStream('pdfs/tables.pdf'));
pdfDoc.end();
