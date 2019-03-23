// / pdf
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import { store } from '../store';

const makePdf = (tableName, columns, data, chartImageURL = null, pageSize, pageOrientation) => {
  const { vfs } = vfsFonts.pdfMake;
  // const {columns,data} = this.state;
  chartImageURL = store.getState().chart.chartImageURL || null;
  pdfMake.vfs = vfs;
  const titlePDF = columns.map(value => value.name.split("_").join(" "))
  const dataPDF = [titlePDF, ...data];
  const createdDate = new Date();
  let docDefinition = {
    pageOrientation: pageOrientation || 'portrait',
    pageSize,
    content: [
      { text: `${tableName}`, style: 'header' },
      { text: `Ngày ${createdDate.getDate()} tháng ${createdDate.getMonth()} năm ${createdDate.getFullYear()}`},
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: columns.map(value => `${100/columns.length}%`),
          body: dataPDF,
        },
      },
    ],
  };
  if (chartImageURL) {
    docDefinition.content = [
      ...docDefinition.content.slice(0, 2),  
      {
        // if you specify width, image will scale proportionally
        image: chartImageURL || '',
        width: '750',
      },
      ...docDefinition.content.slice(2),
    ];
  }
  pdfMake.createPdf(docDefinition).download(tableName);
};

export { makePdf };
