import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const style = {
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
								<CardHeader>
									<h4>Quảng bá nguy cơ</h4>
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
								<CardHeader>
									<h4>Hành vi người dùng</h4>
								</CardHeader>
								<CardBody>
								</CardBody>
							</Card>	
						</Grid>
						<Grid item xs={12} sm={6}>
							<Card>
								<CardHeader>
									<h4>Thêm / Sửa / Xóa người dùng</h4>
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
								<CardHeader>
									<h4>Thêm thiết bị</h4>
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

export default withStyles(style)(ServiceManager);
