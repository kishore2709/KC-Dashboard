import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from 'components/CustomButtons/Button.jsx';

import PdfPng from 'assets/img/pdf.png';
import ExcelPng from 'assets/img/excel.png';
import Typography from '@material-ui/core/Typography';
import { PostApi } from '_helpers/Utils';
import axios from 'axios';
import FileSaver from 'file-saver';
import Fab from '@material-ui/core/Fab';
import CloudDownload from '@material-ui/icons/CloudDownload';
import CircularProgress from '@material-ui/core/CircularProgress';

import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';

const styles = theme => ({
  card: {
    width: 220,
    height: 300,
    overflow: 'hidden',
    borderRadius: '5px',
    boxSizing: 'content-box',
    border: '5px',
    boxShadow:
      '0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  cardTitle: {
    background: '#F34636',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottom: '1px solid black',
  },
  cardContent: {
    padding: '10px 15px',
    textTransform: 'none',
  },
  img: {
    paddingBottom: '15px',
    height: 180,
    width: 180,
  },
});
class Exports extends React.Component {
  state = {
    loadingPdf: false,
    loadingExcel: false,
  };

  exportPdf = () => {
    this.setState({ loadingPdf: true });
    axios
      .post(
        '/api/users/downloadPdf',
        {},
        {
          responseType: 'arraybuffer',
          headers: {
            Accept: 'application/pdf'
          },
        }
      )
      .then(response => {
        console.log(response);
        // response.data is an empty object
        const blob = new Blob([response.data], {
          type: 'application/pdf'
        });
        this.setState({ loadingPdf: false });
        FileSaver.saveAs(blob, 'Thống kê dữ liệu.pdf');
      });
  };

  exportExcel = () => {
    this.setState({ loadingExcel: true });
    axios
      .post(
        '/api/users/downloadExcel',
        {},
        {
          responseType: 'arraybuffer'
        }
      )
      .then(response => {
        // console.log(response);
        const blob = new Blob([response.data]);
        this.setState({ loadingExcel: false });
        FileSaver.saveAs(blob, 'Thống kê dữ liệu.xlsx');
      });
  };

  render() {
    const { classes } = this.props;
    const { loadingExcel, loadingPdf } = this.state;

    return (
      <Grid
        container
        spacing={24}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item style={{ textAlign: 'center' }}>
          <Paper className={classes.card}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item className={classes.cardTitle}>
                <Typography variant="subtitle1">Xuất bản Pdf</Typography>
              </Grid>
              <div className={classes.cardContent}>
                <Grid item>
                  <img
                    className={classes.img}
                    src={PdfPng}
                    alt="Download Pdf"
                    // height={100}
                  />
                </Grid>
                <Grid item>
                  {loadingPdf ? (
                    <CircularProgress disableShrink />
                  ) : (
                    <Fab
                      variant="extended"
                      onClick={this.exportPdf}
                      size="medium"
                      color="primary"
                      aria-label="Download"
                    >
                      <CloudDownload />
                      Tải xuống
                    </Fab>
                  )}
                </Grid>
              </div>
            </Grid>
          </Paper>
        </Grid>
        <Grid item style={{ textAlign: 'center' }}>
          <Paper className={classes.card}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item className={classes.cardTitle}>
                <Typography variant="subtitle1">Xuất bản Excel</Typography>
              </Grid>
              <div className={classes.cardContent}>
                <Grid item>
                  <img
                    className={classes.img}
                    src={ExcelPng}
                    alt="Download Excel"
                    width={180}
                  />
                </Grid>
                <Grid item>
                  {loadingExcel ? (
                    <CircularProgress disableShrink />
                  ) : (
                    <Fab
                      variant="extended"
                      onClick={this.exportExcel}
                      size="medium"
                      color="primary"
                      aria-label="Download"
                    >
                      <CloudDownload />
                      Tải xuống
                    </Fab>
                  )}
                </Grid>
              </div>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Exports);
