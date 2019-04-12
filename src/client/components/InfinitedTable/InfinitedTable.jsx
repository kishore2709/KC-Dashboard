import React, { useState, useRef, useEffect } from 'react';
import {
  AutoSizer,
  Column,
  Table,
  defaultTableRowRenderer,
} from 'react-virtualized';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';

import ReactJson from 'react-json-view';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// use the component in your app!

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

const Component = ({ list, classes }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const tableRef = useRef();

  const Details = ({ children, index }) => (
    <div style={{ cursor: 'pointer' }} onClick={() => setSelectedIndex(index)}>
      {children}
    </div>
  );

  const _getDatum = index => list[index % list.length];
  const _getRowHeight = ({ index }) => (index === selectedIndex ? 800 : 48);
  const rowGetter = ({ index }) => _getDatum(index);
  const cellRenderer = ({ rowIndex }) => {
    if (rowIndex !== selectedIndex) {
      return (
        <Details index={rowIndex}>
          <ExpandMore />
        </Details>
      );
    }
    return (
      <Details index={-1}>
        <ExpandLess />
      </Details>
    );
  };

  useEffect(() => {
    tableRef.current.recomputeRowHeights();
  }, [selectedIndex]);

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
            <ReactJson
              src={{
                date: '2019-02-22',
                time: '09:16:49',
                s_sitename: 'W3SVC1',
                s_computername: 'WIN2008R2-TEST',
                server_ip: '192.168.0.52',
                cs_method: 'GET',
                cs_uri_stem: '/',
                cs_uri_query: '-',
                s_port: '80',
                cs_username: '-',
                c_ip: '192.168.0.66',
                cs_version: 'HTTP/1.1',
                cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
                cs_cookie: '-',
                cs_referer: '-',
                cs_host: '192.168.0.52',
                sc_status: '200',
                sc_substatus: '0',
                sc_win32_status: '0',
                sc_bytes: '936',
                cs_bytes: '116',
                time_taken: '10',
              }}
            />
            {/* {rowData.details} */}
          </div>
        </div>
      );
    }
    return defaultTableRowRenderer(props);
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
        height: '70vh',
      }}
    >
      <Typography variant="h6" className={classes.titleHeader}>
        Dữ liệu log máy chủ web
      </Typography>
      <AutoSizer>
        {({ width, height }) => (
          <Table
            headerClassName={classes.headerTable}
            rowClassName={classes.tableRow}
            ref="Table"
            headerHeight={56}
            height={height}
            overscanRowCount={10}
            rowHeight={_getRowHeight}
            rowGetter={rowGetter}
            rowCount={1000}
            width={width}
            ref={tableRef}
            rowRenderer={rowRenderer}
          >
            <Column
              label="Chi tiết"
              cellDataGetter={({ rowData }) => rowData.length}
              cellRenderer={cellRenderer}
              dataKey="index"
              disableSort
              width={width * 0.2}
            />
            <Column
              dataKey="name"
              disableSort
              label="Nội dung"
              width={width * 0.9}
            />
          </Table>
        )}
      </AutoSizer>
    </Card>
  );
};

export default withStyles(styles)(Component);
