import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
  }
};

class ServiceManager extends React.Component {
  
	constructor(props) {
		super(props);
	}

  render() {
    const { classes } = this.props;
    return (
      	<React.Fragment>
					<Grid container spacing={24}>
						<Grid item xs={12} sm={6}>
						<Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Quảng bá nguy cơ</h4>
              </CardHeader>
              <CardBody>
									<Button>SMS</Button>
									<Button>Email</Button>
									<Button>Telephone</Button>
								</CardBody>
            </Card>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Card>
							<CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Hành vi người dùng</h4>
              </CardHeader>
								<CardBody>
								</CardBody>
							</Card>	
						</Grid>
						<Grid item xs={12} sm={6}>
							<Card>
							<CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Thêm / Sửa / Xóa người dùng</h4>
              </CardHeader>
								
								<CardBody>
									<Button>Thêm</Button>
									<Button>Sửa</Button>
									<Button>Xóa</Button>
								</CardBody>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Card>
							<CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Thêm thiết bị</h4>
              </CardHeader>
								<CardBody>
								</CardBody>
							</Card>
						</Grid>
					</Grid>	
        </React.Fragment>
    );
  }
}

export default withStyles(styles)(ServiceManager);
