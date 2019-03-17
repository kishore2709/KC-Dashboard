import React from 'react';
import ReactExport from 'react-data-export';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ViewModule from '@material-ui/icons/ViewModule';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
// const { ExcelColumn } = ReactExport.ExcelFile;

const MakeExcel = props => (
  <ExcelFile
    filename={props.name}
    element={
      <Tooltip title="Xuất bản dạng Excel">
        <IconButton
          aria-label="Xuất bản Excel"
          //   onClick={() => {
          //     makePdf(columns, curData);
          //   }}
        >
          <ViewModule />
        </IconButton>
      </Tooltip>
    }
  >
    <ExcelSheet dataSet={props.data} name="Employees" />
  </ExcelFile>
);

export { MakeExcel };
