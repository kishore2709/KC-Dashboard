import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@material-ui/core';

const styles = theme => ({
  typo: {
    minWidth: '100px',
    fontWeight: 'bold',
  },
  OKFab: {
    padding: 10,
    margin: 0,
    display: 'inline-block',
    backgroundColor: '#0F0',
    borderRadius: '50%',
    width: 10,
    height: 10,
  },
  RedFab: {
    padding: 10,
    margin: 0,
    display: 'inline-block',
    backgroundColor: '#008000',
    borderRadius: '50%',
    width: 10,
    height: 10,
  },
});

class Status extends React.Component {
  // const { classes } = props;
  // console.log('in status', classes);
  render() {
    const { classes, cities } = this.props;
    const OKButton = (
      <IconButton>
      <div className={classes.OKFab}/>
      </IconButton>
    );
    const WarnButton = (
      <IconButton>
      <div className={classes.RedFab}/>
      </IconButton>
    );
    return (
      <div style={{ position: 'absolute', top: 10, right: 0, width: 200 }}>
        <Grid container>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Typography className={classes.typo} align="center">
                Thành phố
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.typo} align="center">
                Trạng thái
              </Typography>
            </Grid>
          </Grid>
          {cities.map(city => (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography className={classes.typo} align="center">
                  {city.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.typo} align="center">
                  {city.status ? OKButton : WarnButton}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Status);
