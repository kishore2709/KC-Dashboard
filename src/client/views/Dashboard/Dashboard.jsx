import React from "react";
import PropTypes from "prop-types";
// hot
// import { hot } from 'react-hot-loader/root';
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import Info from "@material-ui/icons/Info";
import FileCopy from "@material-ui/icons/FileCopy";

import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// loader
import Loadable from "react-loadable";
import TableLoader from "components/ContentLoader/TableLoader.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Loading from "components/Loading/Loading.jsx";
// import WarningStatus from "components/Warning/Warning.jsx";
import { withToastManager } from "react-toast-notifications";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
// import { serverStatusConstants } from "_constants";
import { dashboardActions } from "_actions";
// import { PostApi } from "_helpers/Utils";
// import Grid from "@material-ui/core/Grid";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

//
// import Discover from 'views/Discover/Discover.jsx';
const Discover = Loadable({
  loader: () =>
    import(/* webpackPreload: true */ "views/Discover/Discover.jsx"),
  loading: TableLoader
});
// import VnMap from 'components/Maps/Maps.jsx';
const VnMap = Loadable({
  loader: () => import(/* webpackPreload: true */ "components/Maps/Maps.jsx"),
  loading: TableLoader
});

const styles = theme => ({
  map: {
    height: "100%",
    display: "flex"
  },
  parent: {
    display: "flex"
  },
  discover: {
    padding: "10px",
    margin: "20px"
  },
  info: {
    marginTop: "40px"
  },
  infoGridItem: {
    display: "flex",
    padding: "0px 0px 0px 5px"
  }
});
class Dashboard extends React.Component {
  pdfExportComponent;
  componentDidMount() {
    const startDate =
      this.props.dashboard.dateRange.start ||
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endDate = this.props.dashboard.dateRange.end || new Date();
    this.handleDateRangeChange(startDate, endDate);
  }

  componentWillUnmount() {
    console.log("Dashboard unmount..");
  }
  handleDateRangeChange = (startDate, endDate) => {
    const { getDashboardData, dashboard } = this.props;
    getDashboardData({
      ...dashboard,
      dateRange: {
        start: startDate,
        end: endDate
      }
    });
  };

  render() {
    const { classes, dashboard } = this.props;
    // const { data } = this.state;
    const { data } = dashboard;
    // console.log(dashboard);
    // console.log(targetCity, data);
    if (data.length === 0) return <Loading />;
    // console.log(data, targetCity);
    const { reports } = data;
    // console.log(reports);
    if (!reports) return <Loading />;
    // if (!reports || !Array.isArray(reports)) return <WarningStatus />;
    const { attacks, logs, pcaps, bugs, website, server } = reports[0];

    // const { attacks, logs, pcaps, bugs, server, website } = reports[0];

    return (
        <GridContainer
          // ref={this.setRef}
          spacing={24}
          style={{ width: "100%", height: "100%", display: "flex" }}
        >
          <GridItem xs={12} md={6} lg={5} style={{ margin: "auto" }}>
            <VnMap />
          </GridItem>
          <GridItem
            xs={12}
            md={6}
            lg={7}
            // className={classes.infoGridItem}
            style={{
              display: "flex",
              padding: "0px 0px 0px 5px"
            }}
          >
            <div
              style={{
                marginTop: "80px"
              }}
            >
              <GridContainer>
                <React.Fragment>
                  <GridItem xs={12}>
                    <GridContainer
                      direction="row"
                      justify="center"
                      alignItems="stretch"
                    >
                      <GridItem xs={12} sm={6} lg={4}>
                        <Card>
                          <CardHeader color="warning" stats icon>
                            <CardIcon color="danger">
                              <Info />
                            </CardIcon>
                            <Typography
                              component="span"
                              className={classes.cardCategory}
                            >
                              Số tấn công
                            </Typography>
                            <CardBody>
                              <h3 className={classes.cardTitle}>{attacks}</h3>
                            </CardBody>
                          </CardHeader>
                          <CardFooter stats>
                            <div className={classes.stats}>
                              <Danger>
                                <Warning />
                              </Danger>
                              <a
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                Chi tiết
                              </a>
                            </div>
                          </CardFooter>
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} lg={4}>
                        <Card>
                          <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                              <Store />
                            </CardIcon>
                            <Typography
                              component="span"
                              className={classes.cardCategory}
                            >
                              Số gói Pcap
                            </Typography>
                            <h3 className={classes.cardTitle}>{pcaps}</h3>
                          </CardHeader>
                          <CardFooter stats>
                            <div className={classes.stats}>
                              <DateRange />
                              24 giờ gần nhất
                            </div>
                          </CardFooter>
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} lg={4}>
                        <Card>
                          <CardHeader color="danger" stats icon>
                            <CardIcon color="warning">
                              <FileCopy />
                            </CardIcon>
                            <Typography
                              component="span"
                              className={classes.cardCategory}
                            >
                              Số dòng Log
                            </Typography>
                            <h3 className={classes.cardTitle}>{logs}</h3>
                          </CardHeader>
                          <CardFooter stats>
                            <div className={classes.stats}>
                              <LocalOffer />
                              Mongodb
                            </div>
                          </CardFooter>
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomTabs
                          title="Thông tin lỗi:"
                          headerColor="primary"
                          tabs={[
                            {
                              tabName: "Bugs",
                              tabIcon: BugReport,
                              tabContent: (
                                <Tasks
                                  checkedIndexes={[0, 3]}
                                  tasksIndexes={[0, 1, 2]}
                                  tasks={bugs}
                                />
                              )
                            },
                            {
                              tabName: "Website",
                              tabIcon: Code,
                              tabContent: (
                                <Tasks
                                  checkedIndexes={[0]}
                                  tasksIndexes={[0, 1, 2]}
                                  tasks={website}
                                />
                              )
                            },
                            {
                              tabName: "Server",
                              tabIcon: Cloud,
                              tabContent: (
                                <Tasks
                                  checkedIndexes={[1]}
                                  tasksIndexes={[0, 1, 2]}
                                  tasks={server}
                                />
                              )
                            }
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </React.Fragment>
              </GridContainer>
            </div>
          </GridItem>
          <GridItem xs={12}>
            <Discover />
          </GridItem>
        </GridContainer>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  const { serverStatus, dashboard } = state;
  return {
    dashboard,
    serverStatus
  };
}

const mapDispatchToProps = dispatch => ({
  getDashboardData: newStatus => {
    dispatch(dashboardActions.get(newStatus));
  },
  changeDateRange: newStatus => {
    dispatch(dashboardActions.changeDateRange(newStatus));
  },
  setRef: newStatus => {
    dispatch(dashboardActions.setRef(newStatus));
  }
});

const connectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(Dashboard));
export default withStyles({ ...styles, ...dashboardStyle })(connectedDashboard);
