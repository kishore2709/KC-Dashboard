import React from 'react';
import { PostApiForm, ip } from '_helpers/Utils';
import { aimlActions } from '_actions';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import { drawerWidth } from 'assets/jss/material-dashboard-react.jsx';

const styles = theme => ({
  table: {
    // width: `calc(100% - ${drawerWidth}px)`,
    margin: '0px 5px',
    border: '1px solid black',
  },
  parent: {
    display: 'flex',
  },
  canOverflow: {
    // maxWidth: '300px',
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

class RecentlyTable extends React.Component {
  render() {
    const { aiml, classes } = this.props;
    const columns = [
      {
        name: 'Pattern',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <div className={classes.parent}>
              <Typography color="primary" className={classes.canOverflow}>
                {value}
              </Typography>
            </div>
          ),
        },
      },
      {
        name: 'Template',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <div className={classes.parent}>
              <div className={classes.canOverflow}>{value}</div>
            </div>
          ),
        },
      },
    ];

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],
      page: 0,
      selectableRows: false,
    };
    const data = aiml.data.map(val => [val.aiml_question, val.aiml_answer]);
    return (
      <Paper className={classes.table}>
        <MUIDataTable
          title="Câu hỏi gần đây"
          data={data}
          columns={columns}
          options={options}
        />
      </Paper>
    );
  }
}

export default connect(
  state => ({ aiml: state.aiml }),
  null
)(withStyles(styles)(RecentlyTable));
