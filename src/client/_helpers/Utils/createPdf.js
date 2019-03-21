// / pdf
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

const makePdf = (tableName, columns, data, pageSize, pageOrientation) => {
  const { vfs } = vfsFonts.pdfMake;
  // const {columns,data} = this.state;
  pdfMake.vfs = vfs;
  const titlePDF = {
    data: [],
    width: [],
  };
  columns.map((value, index) => {
    titlePDF.data.push(value.name);
    titlePDF.width.push('auto');
  });
  // console.log(titlePDF);
  const dataPDF = data;
  dataPDF.unshift(titlePDF.data);
  const docDefinition = {
    pageOrientation: pageOrientation || 'portrait',
    pageSize,
    content: [
      { text: tableName, style: 'header' },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: titlePDF.width,
          body: dataPDF,
        },
      },
    ],
  };
  pdfMake.createPdf(docDefinition).download(tableName);
};

export { makePdf };
