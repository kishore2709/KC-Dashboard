// / pdf
import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import { store } from '../store';

const makePdf = (
  tableName,
  columns,
  data,
  chart = true,
  pageSize,
  pageOrientation
) => {
  const { vfs } = vfsFonts.pdfMake;
  // const {columns,data} = this.state;
  // console.log(store.getState());
  let chartImageURL = null;
  let pieChartImage = null;
  if (chart) {
    chartImageURL = store.getState().chart.chartImageURL || null;
    pieChartImage = store.getState().chart.pieChartImageURL || null;
  }
  pdfMake.vfs = vfs;
  const titlePDF = columns.map(value => value.name.split('_').join(' '));
  // console.log(data);
  // console.log(JSON.parse(JSON.stringify(data)));
  const dataPDF = [titlePDF, ...data];
  // console.log(dataPDF);

  const createdDate = new Date();
  const docDefinition = {
    pageOrientation: pageOrientation || 'portrait',
    pageSize,
    content: [
      { text: `${tableName}`, style: 'header' },
      {
        text: `Ngày ${createdDate.getDate()} tháng ${createdDate.getMonth()} năm ${createdDate.getFullYear()}`,
        style: 'headerCaption',
      },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: columns.map(value => `${100 / columns.length}%`),
          body: dataPDF,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        alignment: 'center',
      },
      headerCaption: {
        fontSize: 14,
        italics: true,
        alignment: 'center',
      },
    },
  };
  if (pieChartImage) {
    docDefinition.content = [
      ...docDefinition.content.slice(0, 2),
      {
        // if you specify width, image will scale proportionally
        image: pieChartImage,
        width: '200',
        style: {
          alignment: 'center',
        },
      },
      ...docDefinition.content.slice(2),
    ];
  }
  if (chartImageURL) {
    docDefinition.content = [
      ...docDefinition.content.slice(0, 2),
      {
        // if you specify width, image will scale proportionally
        image: chartImageURL,
        width: '750',
        style: {
          alignment: 'center',
        },
      },
      ...docDefinition.content.slice(2),
    ];
  }
  pdfMake.createPdf(docDefinition).download(tableName);
};

export { makePdf };
