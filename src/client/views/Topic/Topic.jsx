import React from 'react';
import ListBox from 'components/List/List.jsx';
import Grid from '@material-ui/core/Grid';

class Topic extends React.Component {
  render() {
    const { arrayItems } = this.props;
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <ListBox
          listname="Danh sách topic"
          placeholder="Nhập tên topic"
          arrayItems={arrayItems}
        />
      </Grid>
    );
  }
}

export default Topic;
