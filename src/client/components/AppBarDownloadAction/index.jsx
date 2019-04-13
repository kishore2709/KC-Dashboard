import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import pdfIcon from 'assets/img/pdf.png';
import excelIcon from 'assets/img/excel.png';
import Tooltip from '@material-ui/core/Tooltip';

export default function({ excelLink, pdfLink }) {
  return (
    <React.Fragment>
      <Tooltip title="Tải xuống dạng pdf" aria-label="Pdf file Download">
        <IconButton onClick={() => console.log(pdfLink)}>
          <img src={pdfIcon} alt="Tải xuống pdf" width={24} height={24} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Tải xuống dạng excel" aria-label="Excel file download">
        <IconButton onClick={() => console.log(excelLink)}>
          <img src={excelIcon} alt="Tải xuống excel" width={24} height={24} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
