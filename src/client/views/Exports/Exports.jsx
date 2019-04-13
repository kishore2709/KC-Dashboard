import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PdfPng from 'assets/img/pdf.png';
import ExcelPng from 'assets/img/excel.png';
import { PostApi } from '_helpers/Utils';
import axios from 'axios';
import FileSaver from 'file-saver';

class Exports extends React.Component {
  exportPdf = () => {
    axios
      .post(
        '/api/users/downloadPdf',
        {},
        {
          responseType: 'arraybuffer',
          headers: {
            Accept: 'application/pdf',
          },
        }
      )
      .then(response => {
        console.log(response);
        // response.data is an empty object
        const blob = new Blob([response.data], {
          type: 'application/pdf',
        });
        FileSaver.saveAs(blob, 'Thống kê dữ liệu.pdf');
      });
  };

  exportExcel = () => {
    if (this.props.dashboardRef === null)
      alert(
        'Trang chủ chưa được ghé thăm. Bạn hãy ấn vào menu Trang chủ, sau đó quay lại để export!'
      );
    else this.props.dashboardRef.save();
  };

  render() {
    return (
      <Grid
        container
        spacing={24}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item style={{ textAlign: 'center' }}>
          <img
            src={PdfPng}
            onClick={this.exportPdf}
            alt="Download Pdf"
            height={200}
          />
        </Grid>
        <Grid item style={{ textAlign: 'center' }}>
          <img
            src={ExcelPng}
            onClick={this.exportExcel}
            alt="Download Excel"
            height={200}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Exports;
