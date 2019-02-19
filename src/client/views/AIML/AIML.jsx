import React from 'react';
import { hot } from 'react-hot-loader/root';
import withStyles from '@material-ui/core/styles/withStyles';

// loader
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';

// import Text2AIML from './Text2AIML';
// core
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

//

const Text2AIML = Loadable({
  loader: () => import(/* webpackPreload: true */ './Text2AIML.jsx'),
  loading: TableLoader,
});

const styles = {};

class AIML extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.Text2AIML}>
          <Text2AIML
            onSubmit={e => {
              console.log(e);
            }}
          />
        </Grid>
        <Grid item xs={12} />
      </Grid>
    );
  }
}

export default hot(withStyles(styles)(AIML));
