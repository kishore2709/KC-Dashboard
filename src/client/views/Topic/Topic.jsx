import React from 'react';
import ListBox from 'components/List/List.jsx';
import Grid from '@material-ui/core/Grid';

class Topic extends React.Component {
  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <ListBox />
      </Grid>
    );
  }
}

export default Topic;
