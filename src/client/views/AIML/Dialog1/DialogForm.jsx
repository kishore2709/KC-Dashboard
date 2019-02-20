import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: '',
    arr: [{ Q: 'haha', A: 'xyz' }, { Q: 'abc', A: 'xyz' }],
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { arr } = this.state;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              {arr.map((val, index) => (
                <FormControlLabel
                  value={index.toString()}
                  control={<Radio />}
                  label={
                    <React.Fragment>
                      <TextField
                        id="outlined-bare"
                        value={val.Q}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-bare"
                        value={val.A}
                        margin="normal"
                        variant="outlined"
                      />
                    </React.Fragment>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  this.props.onSave(this.state.arr[this.state.value].Q);
                }}
              >
                Save
              </Button>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    this.props.onCancel();
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
