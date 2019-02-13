import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
// import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
// loader
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';
//

// import AccessManagement from 'components/AccessManagement/AccessManagement';
const AccessManagement = Loadable({
  loader: () => import(/* webpackPreload: true */ 'components/AccessManagement/AccessManagement'),
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

function UserPermission(props) {
  const { classes } = props;
  return (
    <div>
      <GridContainer>
        <AccessManagement />
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(UserPermission);
