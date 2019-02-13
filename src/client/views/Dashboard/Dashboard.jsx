import React from 'react';
import PropTypes from 'prop-types';
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
import Loading from 'components/Loading/Loading.jsx';
import WarningStatus from 'components/Warning/Warning.jsx';
import { withToastManager } from 'react-toast-notifications';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { serverStatusConstants } from '_constants';
// 
// import Discover from 'views/Discover/Discover.jsx';
const Discover = Loadable({
  loader: () => import(/* webpackPreload: true */'views/Discover/Discover.jsx'),
  loading: TableLoader,
});

import { PostApi } from '_helpers/Utils';
import Grid from '@material-ui/core/Grid';
import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';
// import VnMap from 'components/Maps/Maps.jsx';
const VnMap = Loadable({
  loader: () => import(/* webpackPreload: true */'components/Maps/Maps.jsx'),
  loading: TableLoader,
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
    if (this.state.loading) return <Loading/>;
    return (
      <GridContainer>
        {data.map(val => {
          console.log(val);
          if ('layout1' in val)
            return (
              <React.Fragment>
                <GridItem xs={12} sm={3} md={3}>
                  <VnMap />
                </GridItem>
              </React.Fragment>
            );
          if ('layout2' in val)
            return (
              <React.Fragment>
                <GridItem xs={12} sm={9} md={9}>
                  <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>content_copy</Icon>
                          </CardIcon>
                          <Typography
                            component="span"
                            className={classes.cardCategory}
                          >
                            Dữ liệu phân tích
                          </Typography>
                          <h3 className={classes.cardTitle}>
                            {23} <small>GB</small>
                          </h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <Danger>
                              <Warning />
                            </Danger>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              Mở rộng bộ nhớ
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
                            Số lượng gói tin
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
                          <CardIcon color="danger">
                            <Icon>info_outline</Icon>
                          </CardIcon>
                          <Typography
                            component="span"
                            className={classes.cardCategory}
                          >
                            Số cảnh báo
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
          if ('layout3' in val)
            return (
              <React.Fragment>
                <Grid item xs={12}>
                  <Discover />
                </Grid>
              </React.Fragment>
            );
        })}
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
export default withStyles(dashboardStyle)(connectedDashboard);
