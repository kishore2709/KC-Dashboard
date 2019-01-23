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
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Table from 'components/Table/Table.jsx';
import Tasks from 'components/Tasks/Tasks.jsx';
import CustomTabs from 'components/CustomTabs/CustomTabs.jsx';
import Danger from 'components/Typography/Danger.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Loading from 'components/Loading/Loading.jsx';
import WarningStatus from 'components/Warning/Warning.jsx';

// / redux
import { connect } from 'react-redux';
import { serverStatusConstants } from '_constants';
// import classnames from 'classnames';
import { PostApi } from '_helpers/Utils';
import {
  userLogo,
  groupLogo,
  alertLogo,
  webLogo,
  dnsLogo,
  transferLogo,
  agentLogo,
  searchLogo,
  listAlertLogo,
  smsLogo,
  emailLogo,
} from 'components/icon/Icon';
import { bugs, website, server } from 'variables/general.jsx';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from 'variables/charts.jsx';

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';
import { userInfo } from 'os';

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
  constructor(props){
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
          this.setState({data:res, loading:false});
        }
      })
      .catch(err => {
        console.log('get user data from database err');
      });
  }

  render() {
    const { classes, serverStatus } = this.props;
    const { data } = this.state;
    console.log('serverStatus in props dashboard');
    console.log(serverStatus);
    if (serverStatus.type === serverStatusConstants.LOADING) {
      return <Loading />;
    }
    if (serverStatus.type === serverStatusConstants.ERROR) {
      return <WarningStatus />;
    }
    if (this.state.loading) return <Loading />;
    return (
      <div>
      {data.map(val=>{
        console.log(val);
        if ('layout1' in val) return (<GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Dữ liệu phân tích</p>
              <h3 className={classes.cardTitle}>
                {val.layout1[0]} <small>GB</small>
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
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Số lượng gói tin</p>
              <h3 className={classes.cardTitle}>{val.layout1[1]}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                24 giờ gần nhất
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Số cảnh báo</p>
              <h3 className={classes.cardTitle}>{val.layout1[2]}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Truy xuất từ cơ sở dữ liệu
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Số người dùng</p>
              <h3 className={classes.cardTitle}>+{val.layout1[3]}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Mới cập nhật
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>)
        if ('layout2' in val) return (<GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={val.layout2.dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Quản lý log truy cập</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{' '}
                  increase in today access.
                </p>
              </CardBody>
              <CardFooter chart>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  {logLists.map(obj => (
                    <Grid key={obj.key} item>
                      <CardMedia
                        className={classes.media}
                        image={obj.img}
                        title={obj.title}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={val.layout2.emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Quản lý dịch vụ truy cập</h4>
                <p className={classes.cardCategory}>
                  Dịch vụ truy cập gần nhất
                </p>
              </CardBody>
              <CardFooter chart>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  {serviceAccessLists.map(obj => (
                    <Grid key={obj.key} item>
                      <CardMedia
                        className={classes.media}
                        image={obj.img}
                        title={obj.title}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={val.layout2.completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Quảng bá cảnh báo</h4>
                <p className={classes.cardCategory}>
                  <div className={classes.stats}>
                    <AccessTime /> campaign sent 2 days ago
                  </div>
                </p>
              </CardBody>
              <CardFooter chart>
                {BroadcastLists.map(obj => (
                  <Grid key={obj.key} item>
                    <CardMedia
                      className={classes.media}
                      image={obj.img}
                      title={obj.title}
                    />
                  </Grid>
                ))}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>);
        if ('layout3' in val) return (<GridContainer>
          <GridItem xs={12} sm={12} md={6}>
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
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={val.layout3.bugs}
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
                      tasks={val.layout3.website}
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
                      tasks={val.layout3.server}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Thông tin người dùng</h4>
                <p className={classes.cardCategoryWhite}>
                  Thống kê những người dùng mới nhất
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={['ID', 'Tài khoản', 'Vai trò', 'Trạng thái']}
                  tableData={[
                    ['1', 'khangkaka', 'User', 'Active'],
                    ['2', 'trangha', 'User', 'Active'],
                    ['3', 'ngunoo', 'Moderator', 'Active'],
                    ['4', 'nonome', 'Admin', 'Active'],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>);
      })}
      </div>
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
const connectedDashboard = connect(mapStateToProps)(Dashboard);
export default withStyles(dashboardStyle)(connectedDashboard);
