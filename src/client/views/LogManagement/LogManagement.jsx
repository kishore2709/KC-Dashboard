import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components

import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';

const LogTable = Loadable({
  loader: () => import(/* webpackPreload: true */'components/LogTable/LogTable.js'),
  loading: TableLoader,
});
class LogManagement extends React.Component {
  render(){
    return (
    <React.Fragment>
      <LogTable/>
    </React.Fragment>
    );
  }
}

export default LogManagement;