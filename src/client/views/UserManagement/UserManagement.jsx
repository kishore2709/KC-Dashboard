import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// loader
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';
//

// core components
// import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import { Grid } from '@material-ui/core';

// import UserTable from 'components/Table/UserTable';
const UserTable = Loadable({
  loader: () => import(/* webpackPreload: true */ 'components/Table/UserTable'),
  loading: TableLoader,
});

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

function UserProfile(props) {
  const { classes } = props;
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <UserTable />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(UserProfile);
