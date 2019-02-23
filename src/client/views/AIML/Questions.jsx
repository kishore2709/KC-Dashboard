import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    border: '1px solid black',
  },
  cardHeader: {
    border: '1px solid black',
    background: '#47A6EB',
    boxSizing: 'border-box',
    height: '20px',
    color: 'black',
    textAlign: 'center',
  },
  title: {
    border: '1px solid black',
    boxSizing: 'border-box',
    height: 'auto',
    color: 'black',
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    border: '1px solid black',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    height: '30px',
    width: '100%',
  },
  cardContent: {
    border: '1px solid black',
    boxSizing: 'border-box',
    display: 'flex',
  },
});
const Questions = props => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader} title="CÂU HỎI" />
      <CardContent>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={8} className={classes.cardContent}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography className={classes.title}>
                  Câu hỏi đầy đủ
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.title}>Pattern</Typography>
              </Grid>
              <Grid item xs={6}>
                <input
                  className={classes.input}
                  type="text"
                  onMouseOver={e => {
                    console.log(e);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <input className={classes.input} type="text" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Questions);
