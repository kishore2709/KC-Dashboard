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
import 'react-virtualized/styles.css'; // only needs to be imported once

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
    borderBottom: '1px solid black',
    margin: '5px 10px',
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
  date: faker.date.past(),
});

class IPTable extends React.Component {
  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
    // fake data
    const items = [];
    for (let i = 0, l = 100; i < l; i++) {
      items.push(generateRandomItem(i));
    }
    this.state = {
      items,
    };
  }

  loadMore() {
    // simulate a request
    setTimeout(() => {
      this.actuallyLoadMore();
    }, 500);
    // we need to return a promise
    return new Promise((resolve, reject) => {
      this.promiseResolve = resolve;
    });
  }

  actuallyLoadMore() {
    // fake new data
    const newItems = [];
    const s = this.state.items.length + 1;
    for (let i = 0, l = 100; i < l; i++) {
      newItems.push(generateRandomItem(s + i));
    }
    this.setState({ items: this.state.items.concat(newItems) });
    // resolve the promise after data where fetched
    this.promiseResolve();
  }

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
        <Typography variant="h6" className={classes.titleHeader}>
          Dữ liệu Log đăng nhập/đăng xuất
        </Typography>
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
                    width={width * 0.3}
                  />

                  <Column label="Ip" dataKey="ip" width={width * 0.3} />
                  <Column label="Email" dataKey="email" width={width * 0.3} />
                </Table>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </Card>
    );
  }
}

export default withStyles(styles)(IPTable);
