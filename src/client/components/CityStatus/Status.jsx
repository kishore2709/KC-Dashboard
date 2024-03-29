import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
// import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { colors } from 'assets/colors/colors.jsx';
import { connect } from 'react-redux';
import { dashboardActions } from '_actions';

const { active: activeColor, warn: warnColor } = colors;

const styles = theme => ({
  typo: {
    minWidth: '100px',
    fontWeight: 'bold',
    zIndex: 0,
  },
  OKFab: {
    padding: 10,
    margin: 2,
    display: 'inline-block',
    backgroundColor: activeColor,
    borderRadius: '50%',
    width: 6,
    height: 6,
    zIndex: 0,
  },
  RedFab: {
    padding: 10,
    margin: 2,
    display: 'inline-block',
    backgroundColor: warnColor,
    borderRadius: '50%',
    width: 6,
    height: 6,
    zIndex: 0,
  },
});

class Status extends React.Component {
  // const { classes } = props;
  // console.log('in status', classes);
  render() {
    const { classes, dashboard } = this.props;
    // console.log(dashboard);
    const { targetCity, loading } = dashboard;
    const cities = dashboard.cities || [];
    const OKButton = (
      <ButtonBase>
        <div className={classes.OKFab} />
      </ButtonBase>
    );
    const WarnButton = (
      <ButtonBase>
        <div className={classes.RedFab} />
      </ButtonBase>
    );
    return (
      <div style={{ position: 'absolute', top: 20, right: 0, width: 200 }}>
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
          {cities.map((city, index) => (
            <Grid
              key={index}
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={loading ? { pointerEvents: 'none', opacity: '0.4' } : {}}
            >
              <Grid item>
                <Typography
                  className={classes.typo}
                  align="center"
                  color={index === targetCity ? 'secondary' : 'primary'}
                >
                  {city.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  className={classes.typo}
                  align="center"
                  onClick={() => {
                    this.props.changeCity({
                      ...dashboard,
                      targetCity: index,
                    });
                  }}
                >
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

export default connect(
  state => ({
    dashboard: state.dashboard,
  }),
  dispatch => ({
    changeCity: newStatus => {
      dispatch(dashboardActions.get(newStatus));
    },
  })
)(withStyles(styles)(Status));
