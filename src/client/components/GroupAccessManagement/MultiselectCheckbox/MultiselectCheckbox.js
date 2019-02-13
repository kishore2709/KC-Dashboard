import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Checkbox, Select, MenuItem, ListItemText, Input, FormControl, Typography } from '@material-ui/core';

const styles = theme => ({
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 150,
    },
  },
};

class MultiselectCheckbox extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.mainBool !== nextProps.mainBool) return true;
    if (this.props.subBools.length !== nextProps.subBools.length) return true;
    for (var index = 0; index < this.props.subBools.length; index++) {
      if (this.props.subBools[index] !== nextProps.subBools[index]) return true;
    }
    return false;
  }

  handleChange = event => {
    const value = event.target.value;
    const subBools = this.props.subBools.map((_, index) => value.includes(index) ? true : false);
    const mainBool = subBools.includes(true);
    this.props.fireUpAccessChange(mainBool, subBools);
  }

  handleRenderValue = selected => {
    switch (selected.length) {
      case 0: 
        return <Typography color='error' variant='caption'>Không</Typography>;
      case this.props.subBools.length:
        return <Typography color='primary' variant='caption'>Tất cả</Typography>;
      default:
        return <Typography variant='caption'>Một số</Typography>; 
    }
  }

  render() {
    const { mainBool, subBools } = this.props;
    const value = mainBool ? subBools
      .map((value, index) => value ? index : -1)
      .filter(value => value >= 0) 
    : [];
    
    return (
      <FormControl>
        <Select
          multiple
          displayEmpty
          value={value}
          onChange={this.handleChange}
          input={<Input id='select-multiple-checkbox' />}
          renderValue={this.handleRenderValue}
          MenuProps={MenuProps}
          style={{
            width: 60,
          }}
        >
          {subBools.map((_, index) => (
            <MenuItem 
              key={index} 
              value={index}
            >
              <Checkbox
                checked={value.includes(index)}
              />
              <ListItemText 
                primary={index}
              />
            </MenuItem>
          ))}
        </Select>     
      </FormControl>
    );
  }
};

MultiselectCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  mainBool : PropTypes.bool,
  subBools: PropTypes.array,
  fireUpAccessChange: PropTypes.func,
};

export default withStyles(styles)(MultiselectCheckbox);