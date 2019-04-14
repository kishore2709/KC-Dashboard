import React from 'react';
import { withStyles } from '@material-ui/core';
import faker from 'faker';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

import { Table, Column, AutoSizer, InfiniteLoader } from 'react-virtualized';
import './IPTable.css';
// import AppBarAction from 'components/AppBarDownloadAction';
import { PostApi } from '_helpers/Utils';
import { connect } from 'react-redux';

import 'react-virtualized/styles.css'; // only needs to be imported once
// faker.setLocale("vi");

const styles = theme => ({
  tableRow: {
    // borderTop: '1px solid black',
    // background: 'white',
    color: 'black',
  },
  header: {
    height: 80,
    display: 'flex',
    alignItems: 'center',
  },
  titleHeader: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    // textAlign: 'center',
    // margin: '5px',
  },
  cardHeader: {
    borderBottom: '1px solid black',
    display: 'flex',
  },
  headerTable: {
    /* border: 1px slod black; */
    color: 'red',
    paddingRight: '0px !important',
    /* overflow-x: auto; */
  },
});
const generateRandomItem = idx => ({
  id: idx,
  ip: faker.internet.ip(),
  email: faker.internet.email(),
  date: faker.date.past().toISOString(),
  sessionType: 'Đăng nhập',
});

function getSessionLogByTime(startTime, endTime, startIndex, endIndex) {
  return PostApi(
    `/api/users/getSessionLogByTime?startTime=${startTime}&endTime=${endTime}&startIndex=${startIndex}&endIndex=${endIndex}`
  )
    .then(ret => {
      if (ret.status) {
        return ret.data;
      }
      return [];
    })
    .catch(err => console.log(err));
}

class IPTable extends React.Component {
  constructor() {
    super();
    faker.locale = 'vi';
    this.loadMore = this.loadMore.bind(this);
    // fake data
    // const items = [];
    // for (let i = 0, l = 100; i < l; i++) {
    //   items.push(generateRandomItem(i));
    // }
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    getSessionLogByTime(
      this.props.dateRange.start.toISOString(),
      this.props.dateRange.end.toISOString(),
      0,
      0
    ).then(ret => {
      // console.log(ret);
      this.setState(state => ({ items: state.items.concat(ret) }));
    });
  }

  loadMore = ({ startIndex, stopIndex }) => {
    console.log('in load more..', startIndex, stopIndex);
    // console.log(dateRange.start, dateRange.end);
    return getSessionLogByTime(
      this.props.dateRange.start.toISOString(),
      this.props.dateRange.end.toISOString(),
      startIndex,
      stopIndex
    ).then(ret => {
      console.log(ret);
      this.setState(state => ({ items: state.items.concat(ret) }));
    });
  };

  render() {
    const { classes } = this.props;
    // console.log(styles);
    return (
      <Card
        style={{
          // width: '100%',
          borderRadius: 5,
          border: 0,
          color: 'white',
          padding: '15px 20px',
          margin: '0',
          // marginLeft: 0,
          boxShadow: '0 3px 5px 2px #cccccc',
        }}
      >
        <div className={classes.cardHeader}>
          <span className={classes.titleHeader}>
            <Typography variant="h6">Dữ liệu log máy chủ Web</Typography>
          </span>
          {/* <AppBarAction excelLink="excel" pdfLink="pdf" /> */}
        </div>
        <InfiniteLoader
          isRowLoaded={({ index }) => !!this.state.items[index]}
          loadMoreRows={this.loadMore}
          rowCount={1000000}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <Table
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  headerClassName={classes.headerTable}
                  rowClassName={classes.tableRow}
                  headerHeight={40}
                  width={width}
                  height={300}
                  rowHeight={40}
                  rowCount={this.state.items.length}
                  rowGetter={({ index }) => this.state.items[index]}
                >
                  <Column label="Id" dataKey="id" width={width * 0.1} />
                  <Column
                    label="Thời gian"
                    dataKey="date"
                    width={width * 0.2}
                  />

                  <Column label="Ip" dataKey="ip" width={width * 0.2} />
                  <Column label="Email" dataKey="email" width={width * 0.2} />
                  <Column
                    label="Loại"
                    dataKey="sessionType"
                    width={width * 0.1}
                  />
                </Table>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </Card>
    );
  }
}

export default connect(state => ({
  dateRange: state.dashboard.dateRange,
}))(withStyles(styles)(IPTable));
