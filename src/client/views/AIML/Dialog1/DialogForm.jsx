import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

const styles = theme => ({
  root: {
    margin: 0,
    display: 'flex',
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  textField: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
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
    const { classes, dialog } = this.props;
    const { message } = dialog.dialogAIML;
    // console.log(message);
    // const { arr } = this.state;
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={5}>
              <Typography align="center" color="primary" variant="h6">
                Pattern
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography align="center" color="primary" variant="h6">
                Template
              </Typography>
              <Grid item xs={1} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {message.map((val, index) => (
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1}>
                <Radio
                  onClick={() => {
                    this.setState({ value: index });
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="outlined-bare"
                  value={val.aiml_question}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  data-tip=""
                  data-for={`dialogform${index}.Q`}
                  className={classes.textField}
                />
                <ReactTooltip id={`dialogform${index}.Q`}>
                  {val.aiml_question}
                </ReactTooltip>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="outlined-bare"
                  value={val.aiml_answer}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  data-tip=""
                  data-for={`dialogform${index}.A`}
                  className={classes.textField}
                />
                <ReactTooltip id={`dialogform${index}.A`}>
                  {val.aiml_answer}
                </ReactTooltip>
              </Grid>
            </Grid>
          ))}
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
                disabled={!message[this.state.value]}
                onClick={() => {
                  if (!message[this.state.value]) return;
                  this.props.onSave(message[this.state.value].aiml_question);
                }}
              >
                Chọn
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
                  Tiếp tục
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

export default connect(state => ({ dialog: state.dialog }))(
  withStyles(styles)(RadioButtonsGroup)
);
