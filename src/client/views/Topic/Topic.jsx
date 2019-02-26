import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListTopic from './ListTopic.jsx';

class Topic extends React.Component {
  render() {
    const { arrayItems } = this.props;
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <ListTopic
          listname="Danh sách topic"
          placeholder="Nhập tên topic"
          arrayItems={arrayItems}
        />
      </Grid>
    );
  }
}

export default Topic;
