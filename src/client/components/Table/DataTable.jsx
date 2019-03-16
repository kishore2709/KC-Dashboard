import React from 'react';
import { withStyles } from '@material-ui/core/styles';
///
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

import MUIDataTable from 'mui-datatables';
import { PostApi } from '_helpers/Utils';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { dialogActions } from '_actions';
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class DataTable extends React.Component {
  state = {
    rows: [],
    loading: true,
    groups: [],
    columns:[],
    data:[],
  };

   componentWillMount() {
    PostApi('/api/users/getData', {})
    .then(res => {
      let columns=[];
     res.message.columns.map((value,index)=>{
            columns.push({
                name: value,
                options: {
                  filter: true,
                },
              })
      })
      this.setState({columns:columns,data:res.message.data});
    })
    .catch(err => {
    });
  }
  downloadPDF(){
    const {vfs} = vfsFonts.pdfMake;
    const {columns,data} = this.state;
    pdfMake.vfs = vfs;
    let titlePDF={
      data:[],
      width:[],
    }
    columns.map((value,index)=>{
        titlePDF.data.push(value.name);
        titlePDF.width.push('*');
    });
    let dataPDF=data;
    dataPDF.unshift(titlePDF.data);
    var docDefinition = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: titlePDF.width,
            body: dataPDF
          }
        }
      ]
    };
    pdfMake.createPdf(docDefinition).download();
  }
  render() {
   
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      customToolbar: () => (
        <Tooltip title="Dowload PDF">
          <IconButton
            aria-label="Add User"
            onClick={() => {
              this.downloadPDF();
            }}
          >
            <ArrowDownward />
          </IconButton>
        </Tooltip>
      ),
      onRowsDelete: e => {
        const { toastManager } = this.props;
        const asyncDeleteFunction = async function delFunc(rows) {
          toastManager.add('Xóa thành công', {
            appearance: 'success',
            autoDismiss: true,
          });
        };
        asyncDeleteFunction(e.data);
      },
    };

    return (
      <React.Fragment>
        <MUIDataTable
          title="Xuất dữ liệu"
          data={this.state.data}
          columns={this.state.columns}
          options={options}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
});

function mapStateToProps(state) {
  const {  dialog } = state;
  return { dialog };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(withStyles(styles)(DataTable)));
