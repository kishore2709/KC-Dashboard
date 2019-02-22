import React from 'react';
import PropTypes from 'prop-types';
// hot
import { hot } from 'react-hot-loader/root';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
import Store from '@material-ui/icons/Store';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
// loader
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Tasks from 'components/Tasks/Tasks.jsx';
import CustomTabs from 'components/CustomTabs/CustomTabs.jsx';
import Danger from 'components/Typography/Danger.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import Loading from 'components/Loading/Loading.jsx';
import WarningStatus from 'components/Warning/Warning.jsx';
import { withToastManager } from 'react-toast-notifications';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { serverStatusConstants } from '_constants';

import { PostApi } from '_helpers/Utils';
import Grid from '@material-ui/core/Grid';
import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';

//
// import Discover from 'views/Discover/Discover.jsx';
const Discover = Loadable({
  loader: () =>
    import(/* webpackPreload: true */ 'views/Discover/Discover.jsx'),
  loading: TableLoader,
});
// import VnMap from 'components/Maps/Maps.jsx';
const VnMap = Loadable({
  loader: () => import(/* webpackPreload: true */ 'components/Maps/Maps.jsx'),
  loading: TableLoader,
});

const styles = theme => ({
  map: {
    height: '100%',
  },
  parent: {
    display: 'flex',
  },
  info: {
    marginTop: '40px',
  },
});
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      loading: true,
      data: [],
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentWillMount() {
    PostApi('/api/users/dashboardData', {})
      .then(res => {
        if (res === 'err') {
          console.log('err get dashboard data info');
        } else {
          // console.log(res);
          if (Array.isArray(res)) this.setState({ data: res, loading: false });
        }
      })
      .catch(err => {
        console.log('get user data from database err');
      });
  }

  render() {
    const { classes, serverStatus } = this.props;
    const { data } = this.state;
    console.log('dashboard is rendering');
    console.log(serverStatus);
    if (serverStatus.type === serverStatusConstants.LOADING) {
      return <Loading />;
    }
    if (serverStatus.type === serverStatusConstants.ERROR) {
      return <WarningStatus />;
    }
    if (this.state.loading) return <Loading />;
    return (
      <GridContainer spacing={0}>
        {data.map(val => {
          if ('layout1' in val)
            return (
              <GridItem xs={12} md={6} lg={5} className={classes.map}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <GridItem>
                    <VnMap />
                  </GridItem>
                </Grid>
              </GridItem>
            );
        })}
        <GridItem xs={12} md={6} lg={7} style={{
          display: 'flex',
        }}>
          <div style={{
            marginTop: '80px',
          }}>
            <GridContainer>
              {data.map(val => {
                if ('layout2' in val)
                  return (
                    <React.Fragment>
                      <GridItem xs={12} sm={12} md={12}>
                        <GridContainer>
                          <GridItem xs={12} sm={4} md={4}>
                            <Card>
                              <CardHeader color="warning" stats icon>
                                
                                <CardIcon color="danger">
                                  <Icon>info_outline</Icon>
                                </CardIcon>
                                <Typography
                                  component="span"
                                  className={classes.cardCategory}
                                >
                                  Số cuộc tấn công
                                </Typography>
                                <CardBody><h3 className={classes.cardTitle}>
                                  {23}
                                </h3></CardBody>
                                
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
                          <GridItem xs={12} sm={4} md={4}>
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
                                <h3 className={classes.cardTitle}>{32666}</h3>
                              </CardHeader>
                              <CardFooter stats>
                                <div className={classes.stats}>
                                  <DateRange />
                                  24 giờ gần nhất
                                </div>
                              </CardFooter>
                            </Card>
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4}>
                            <Card>
                              <CardHeader color="danger" stats icon>
                              <CardIcon color="warning">
                                  <Icon>content_copy</Icon>
                                </CardIcon>
                                <Typography
                                  component="span"
                                  className={classes.cardCategory}
                                >
                                  Số dòng Log
                                </Typography>
                                <h3 className={classes.cardTitle}>{32}</h3>
                              </CardHeader>
                              <CardFooter stats>
                                <div className={classes.stats}>
                                  <LocalOffer />
                                  Truy xuất từ cơ sở dữ liệu
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
                                  tabName: 'Bugs',
                                  tabIcon: BugReport,
                                  tabContent: (
                                    <Tasks
                                      checkedIndexes={[0, 3]}
                                      tasksIndexes={[0, 1]}
                                      tasks={val.layout2.bugs}
                                    />
                                  ),
                                },
                                {
                                  tabName: 'Website',
                                  tabIcon: Code,
                                  tabContent: (
                                    <Tasks
                                      checkedIndexes={[0]}
                                      tasksIndexes={[0, 1]}
                                      tasks={val.layout2.website}
                                    />
                                  ),
                                },
                                {
                                  tabName: 'Server',
                                  tabIcon: Cloud,
                                  tabContent: (
                                    <Tasks
                                      checkedIndexes={[1]}
                                      tasksIndexes={[0, 1, 2]}
                                      tasks={val.layout2.server}
                                    />
                                  ),
                                },
                              ]}
                            />
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </React.Fragment>
                  );
              })}
            </GridContainer>
          </div>
        </GridItem>
        <GridItem xs={12}>
          {data.map(val => {
            if ('layout3' in val)
              return (
                <React.Fragment>
                  <Discover />
                </React.Fragment>
              );
          })}
        </GridItem>
      </GridContainer>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  const { serverStatus } = state;
  return {
    serverStatus,
  };
}
const connectedDashboard = connect(mapStateToProps)(
  withToastManager(Dashboard)
);
export default hot(
  withStyles({ ...styles, ...dashboardStyle })(connectedDashboard)
);
