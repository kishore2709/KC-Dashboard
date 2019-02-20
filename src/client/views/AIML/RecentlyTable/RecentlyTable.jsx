import React from 'react';
import { PostApiForm, ip } from '_helpers/Utils';
import { aimlActions } from '_actions';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  canOverflow: {
    maxWidth: '300px',
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
            <Typography color="primary" className={classes.canOverflow}>
              {value}
            </Typography>
          ),
        },
      },
      {
        name: 'Template',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography color="secondary" className={classes.canOverflow}>
              {value}
            </Typography>
          ),
        },
      },
    ];

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],
      page: 0,
      selectableRows: false,
    };
    const data = aiml.data.map(val => [val.aiml_question, val.aiml_answer]);
    console.log(data);
    return (
      <MUIDataTable
        title="GẦN ĐÂY"
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default connect(
  state => ({ aiml: state.aiml }),
  null
)(withStyles(styles)(RecentlyTable));
