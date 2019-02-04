import React from 'react';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
// import Update from '@material-ui/icons/Update';
// import ArrowUpward from '@material-ui/icons/ArrowUpward';
// import AccessTime from '@material-ui/icons/AccessTime';
// import Accessibility from '@material-ui/icons/Accessibility';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
// import Table from 'components/Table/Table.jsx';
import Tasks from 'components/Tasks/Tasks.jsx';
import CustomTabs from 'components/CustomTabs/CustomTabs.jsx';
import Danger from 'components/Typography/Danger.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
// import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Loading from 'components/Loading/Loading.jsx';
import WarningStatus from 'components/Warning/Warning.jsx';
// import Link from '@material-ui/core/Link';
import { withToastManager } from 'react-toast-notifications';
// / redux
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { serverStatusConstants } from '_constants';
// import classnames from 'classnames';
import Discover from 'views/Discover/Discover.jsx';
import { PostApi } from '_helpers/Utils';
import {
  alertLogo,
  webLogo,
  dnsLogo,
  transferLogo,
  agentLogo,
  searchLogo,
  smsLogo,
  emailLogo,
} from 'components/icon/Icon';
// import { bugs, website, server } from 'variables/general.jsx';
// import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';
// import { userInfo } from 'os';
import VnMap from 'components/Maps/Maps.jsx';

const logLists = [
  { key: 'webLogo', img: webLogo, title: 'Quản lý Web log' },
  { key: 'dnsLogo', img: dnsLogo, title: 'Quản lý DNS log' },
  { key: 'transferLogo', img: transferLogo, title: 'Quản lý Transfer log' },
  { key: 'agentLogo', img: agentLogo, title: 'Quản lý Agent log' },
];

const serviceAccessLists = [
  { key: 'searchLogo', img: searchLogo, title: 'Tìm kiếm' },
  { key: 'webLogo', img: webLogo, title: 'Quản lý dịch vụ Web' },
  { key: 'dnsLogo', img: dnsLogo, title: 'Quản lý dịch vụ DNS' },
];

const BroadcastLists = [
  { key: 'alertListLogo', img: alertLogo, title: 'Danh sách cảnh báo' },
  { key: 'sendEmailLogo', img: emailLogo, title: 'Gửi Email' },
  { key: 'sendSmsLogo', img: smsLogo, title: 'Gửi SMS' },
];

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
          console.log('err get user info');
        } else {
          console.log(res);
          this.setState({ data: res, loading: false });
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
