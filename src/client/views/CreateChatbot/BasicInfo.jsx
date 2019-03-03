import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// select
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

const colourOptions = [
  { value: 'ocean', label: 'Bán hàng', color: '#00B8D9', isFixed: true },
  // { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
  { value: 'purple', label: 'Nhà hàng', color: '#5243AA' },
  { value: 'red', label: 'Bách hoá', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Chăn nuôi', color: '#FF8B00' },
  { value: 'yellow', label: 'Hành chính', color: '#FFC400' },
  // { value: 'green', label: 'Green', color: '#36B37E' },
  // { value: 'forest', label: 'Forest', color: '#00875A' },
  // { value: 'slate', label: 'Slate', color: '#253858' },
  // { value: 'silver', label: 'Silver', color: '#666666' },
];

const customStyles = {
  control: base => ({
    ...base,
    minHeight: '56px',
    width: '300px',
    // minHeight: 35
  }),
};

const styles = theme => ({
  label: {
    // backgroundColor: '#383838',
    border: '1px solid #383838',
    height: '100%',
    width: '100px',
  },
  typoLabel: {
    // border: '1px solid #383838',
    // width: '300px',
    // height: '100%',
    // height: '100%',
    // color: 'white',
  },
  flexCenterBox: {
    border: '1px solid #383838',
    borderRadius: '4px',
    width: '100px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    width: '300px',
    height: '56px',
  },
});
class BasicInfo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={24}
      >
        <Grid item xs={12} md={6}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item>
              <div className={classes.flexCenterBox}>
                <Typography
                  align="center"
                  variant="h6"
                  className={classes.typoLabel}
                >
                  Tên
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <OutlinedInput
                id="component-outlined"
                className={classes.textField}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item>
              <div className={classes.flexCenterBox}>
                <Typography
                  align="center"
                  variant="h6"
                  className={classes.typoLabel}
                >
                  Lĩnh vực
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                defaultValue={[colourOptions[4], colourOptions[5]]}
                isMulti
                options={colourOptions}
                styles={customStyles}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item>
              <div className={classes.flexCenterBox}>
                <Typography
                  align="center"
                  variant="h6"
                  className={classes.typoLabel}
                >
                  Địa chỉ
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <OutlinedInput
                id="component-outlined"
                className={classes.textField}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item>
              <div className={classes.flexCenterBox}>
                <Typography
                  align="center"
                  variant="h6"
                  className={classes.typoLabel}
                >
                  Điện thoại
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <OutlinedInput
                id="component-outlined"
                className={classes.textField}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(BasicInfo);
