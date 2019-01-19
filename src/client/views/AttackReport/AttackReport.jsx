import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    },
  };

class AttackReport extends React.Component {
  
	constructor(props) {
		super(props);
	}

  render() {
    const { classes } = this.props;
    return (
      	<React.Fragment>
			<Grid container spacing={24}>
				<Grid item xs={12} sm={4}>
					<Card>
						<CardHeader color="danger">
                            <h4 className={classes.cardTitleWhite}>DDoS</h4>
						</CardHeader>
						<CardBody>
						</CardBody>
					</Card>	
				</Grid>
                <Grid item xs={12} sm={4}>
					<Card>
						<CardHeader color="danger">
                            <h4 className={classes.cardTitleWhite}>APT</h4>
						</CardHeader>
						<CardBody>
						</CardBody>
					</Card>	
				</Grid>
                <Grid item xs={12} sm={4}>
					<Card>
						<CardHeader color="danger">
                            <h4 className={classes.cardTitleWhite}>Phissing</h4>
						</CardHeader>
						<CardBody>
						</CardBody>
					</Card>	
				</Grid>
                <Grid item xs={12} sm={4}>
					<Card>
						<CardHeader color="danger">
                            <h4 className={classes.cardTitleWhite}>Malware</h4>
						</CardHeader>
						<CardBody>
						</CardBody>
					</Card>	
				</Grid>
                <Grid item xs={12} sm={4}>
					<Card>
						<CardHeader color="danger">
                            <h4 className={classes.cardTitleWhite}>Deface</h4>
						</CardHeader>
						<CardBody>
						</CardBody>
					</Card>	
				</Grid>
                <Grid item xs={12} sm={4}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ height: '100%' }}
                    >
                        <Grid item>
                            <Fab color="primary" aria-label="Add">
                                <AddIcon />
                            </Fab>
                        </Grid>
                    </Grid>
				</Grid>
			</Grid>	
        </React.Fragment>
    );
  }
}

export default withStyles(styles)(AttackReport);
