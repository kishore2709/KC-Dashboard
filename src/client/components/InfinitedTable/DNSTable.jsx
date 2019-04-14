import React, { useState, useRef, useEffect } from 'react';
import {
  AutoSizer,
  Column,
  Table,
  InfiniteLoader,
  defaultTableRowRenderer,
} from 'react-virtualized';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';

import ReactJson from 'react-json-view';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// use the DNSTable in your app!
// import faker from 'faker';
// import AppBarAction from 'components/AppBarDownloadAction';
import { PostApi } from '_helpers/Utils';

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

// const sample = () => ({
//   date: faker.date.past().toISOString(),
//   time: '09:16:49',
//   s_sitename: 'W3SVC1',
//   s_computername: 'WIN2008R2-TEST',
//   server_ip: '192.168.0.52',
//   cs_method: 'GET',
//   cs_uri_stem: '/',
//   cs_uri_query: '-',
//   s_port: '80',
//   cs_username: '-',
//   c_ip: '192.168.0.66',
//   cs_version: 'HTTP/1.1',
//   cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
//   cs_cookie: '-',
//   cs_referer: '-',
//   cs_host: '192.168.0.52',
//   sc_status: '200',
//   sc_substatus: '0',
//   sc_win32_status: '0',
//   sc_bytes: '936',
//   cs_bytes: '116',
//   time_taken: '10'
// });

function getDNSLogByTime(startTime, endTime, startIndex, endIndex) {
  return PostApi(
    `/api/users/getDNSLogByTime?startTime=${startTime}&endTime=${endTime}&startIndex=${startIndex}&endIndex=${endIndex}`
  )
    .then(ret => {
      if (ret.status) {
        return ret.data;
      }
      return [];
    })
    .catch(err => console.log(err));
}

const DNSTable = ({ classes, dateRange }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [items, setItems] = useState([]);

  const tableRef = useRef();

  const Details = ({ children, index }) => (
    <div style={{ cursor: 'pointer' }} onClick={() => setSelectedIndex(index)}>
      {/* {index} */}
      {children}
    </div>
  );

  const _getDatum = index => items[index % items.length];
  const _getRowHeight = ({ index }) => (index === selectedIndex ? 400 : 48);
  const rowGetter = ({ index }) => _getDatum(index);
  const cellRenderer = ({ rowIndex }) => {
    if (rowIndex !== selectedIndex) {
      return (
        <Details index={rowIndex}>
          <div
            style={{
              display: 'flex',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            {rowIndex}
            <ExpandMore titleAccess="Xem thêm" />
          </div>
        </Details>
      );
    }
    return (
      <Details index={-1}>
        <div
          style={{
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          {rowIndex}
          <ExpandLess titleAccess="Thu gọn" />
        </div>
      </Details>
    );
  };

  useEffect(() => {
    console.log('in Effect', tableRef.current);
    tableRef.current.recomputeRowHeights();
  }, [selectedIndex]);

  useEffect(() => {
    getDNSLogByTime(
      dateRange.start.toISOString(),
      dateRange.end.toISOString(),
      0,
      0
    ).then(ret => {
      console.log(ret);
      setItems(items => items.concat(ret));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rowRenderer = props => {
    const { index, style, className, key, rowData } = props;
    if (index === selectedIndex) {
      return (
        <div
          style={{
            ...style,
            display: 'flex',
            flexDirection: 'column',
          }}
          className={className}
          key={key}
        >
          {defaultTableRowRenderer({
            ...props,
            style: { width: style.width, height: 48 },
          })}
          <div
            style={{
              marginRight: 'auto',
              padding: 10,
              marginLeft: 80,
              // height: 'auto',
              border: '1px solid black',
              // overflowX: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ReactJson src={items[index % items.length]} />
            {/* {rowData.details} */}
          </div>
        </div>
      );
    }
    return defaultTableRowRenderer(props);
  };
  // //
  const loadMore = ({ startIndex, stopIndex }) => {
    console.log('in load more..', startIndex, stopIndex);
    // console.log(dateRange.start, dateRange.end);
    return getDNSLogByTime(
      dateRange.start.toISOString(),
      dateRange.end.toISOString(),
      startIndex,
      stopIndex
    ).then(ret => {
      console.log(ret);
      setItems(items => items.concat(ret));
    });
    // const addArr = [];
    // for (let i = 0; i < stopIndex - startIndex; i++) addArr.push(sample());
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     setItems(items => items.concat(addArr));
    //     // resolve the promise after data where fetched
    //     resolve();
    //   }, 500);
    // });
  };
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
        height: 'auto',
      }}
    >
      <div className={classes.cardHeader}>
        <span className={classes.titleHeader}>
          <Typography variant="h6">Dữ liệu log máy chủ DNS</Typography>
        </span>
        {/* <AppBarAction excelLink="excel" pdfLink="pdf" /> */}
      </div>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!items[index]}
        loadMoreRows={loadMore}
        rowCount={1000000}
      >
        {({ onRowsRendered, registerChild }) => (
          // tableRef = registerChild;
          // console.log('in render..', tableRef);
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                ref={registerChild}
                ref={tableRef}
                onRowsRendered={onRowsRendered}
                headerClassName={classes.headerTable}
                rowClassName={classes.tableRow}
                headerHeight={56}
                height={500}
                overscanRowCount={10}
                rowHeight={_getRowHeight}
                rowGetter={rowGetter}
                rowCount={items.length}
                width={width}
                // ref={tableRef}
                rowRenderer={rowRenderer}
              >
                <Column
                  label="ID"
                  // cellDataGetter={({ rowData }) => rowData.length}
                  cellRenderer={cellRenderer}
                  dataKey="index"
                  disableSort
                  width={width * 0.2}
                />
                <Column
                  dataKey="date"
                  disableSort
                  label="Nội dung"
                  width={width * 0.8}
                />
              </Table>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </Card>
  );
};

export default connect(state => ({
  dateRange: state.dashboard.dateRange,
}))(withStyles(styles)(DNSTable));
