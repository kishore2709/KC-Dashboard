import React from 'react';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { database: 'Md5 Database', autoref: '1 giờ' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.autoref);
    return (
      <form className={classes.root} autoComplete="off">
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="age-label-placeholder">
                Database
              </InputLabel>
              <Select
                value={this.state.database}
                onChange={this.handleChange}
                input={
                  <Input name="database" id="database-label-placeholder" />
                }
                name="database"
                className={classes.selectEmpty}
              >
                <MenuItem value="Md5 Database">Md5 Database</MenuItem>
              </Select>
              <FormHelperText>Chọn CSDL</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="age-label-placeholder">
                Auto-Refresh
              </InputLabel>
              <Select
                value={this.state.autoref}
                onChange={this.handleChange}
                input={<Input name="autoref" id="autoref-label-placeholder" />}
                name="autoref"
                className={classes.selectEmpty}
              >
                <MenuItem value="1 giờ">1 giờ</MenuItem>
              </Select>
              <FormHelperText>
                Chọn khoảng thời gian tự động cập nhật
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(Selection);
