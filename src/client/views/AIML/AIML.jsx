import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
//
import { PostApiForm, ip } from '_helpers/Utils';
// loader
import Loadable from 'react-loadable';
import TableLoader from 'components/ContentLoader/TableLoader.jsx';
import { connect } from 'react-redux';
// import Text2AIML from './Text2AIML';
// core
// noti
import NotificationSystem from 'react-notification-system';
// actions
import { aimlActions } from '_actions';
//
import Grid from '@material-ui/core/Grid';
// hot
import { hot } from 'react-hot-loader/root';

//

const Text2AIML = Loadable({
  loader: () => import(/* webpackPreload: true */ './Text2AIML.jsx'),
  loading: TableLoader,
});

const SelectForm = Loadable({
  loader: () =>
    import(/* webpackPreload: true */ './SelectForm/SelectForm.jsx'),
  loading: TableLoader,
});

const RecentlyTable = Loadable({
  loader: () =>
    import(/* webpackPreload: true */ './RecentlyTable/RecentlyTable.jsx'),
  loading: TableLoader,
});

const Questions = Loadable({
  loader: () => import(/* webpackPreload: true */ './Questions.jsx'),
  loading: TableLoader,
});

const styles = {};

class AIML extends React.Component {
  constructor(props) {
    super(props);
    this.notificationSystem = React.createRef();
  }

  addNotification = (message, level) => {
    // event.preventDefault();
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message,
      level,
    });
  };

  render() {
    const { classes, aiml, dispatch } = this.props;
    return (
      <React.Fragment>
        <NotificationSystem ref={this.notificationSystem} />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <SelectForm />
          </Grid>
          <Grid item xs={12} className={classes.Text2AIML}>
            <Questions onSubmit={e => { console.log(e) }} />
            {/* <Text2AIML
              onSubmit={({ members, answer }) => {
                // save to db
                members.forEach(({ Q, A }) => {
                  PostApiForm(`${ip.server}/textquestions/addquestions`, {
                    textquestion: Q,
                    textanswer: answer,
                    topicname: aiml.topic,
                    chatbotname: aiml.chatbot,
                    entityname: 'không có',
                  })
                    .then(res => {
                      if ('error' in res) throw new Error(res.error);
                      if (!res) throw new Error('err');
                      else {
                        // noti ok;
                        console.log('save ok', res);
                        this.addNotification(
                          'Save TextQuestions Successfully',
                          'success'
                        );
                      }
                    })
                    .catch(error => {
                      this.addNotification(
                        `Something went wrong in Textquestions: "${
                          error.message
                        }"`,
                        'error'
                      );
                    });
                  PostApiForm(`${ip.server}/aimlquestions/add`, {
                    aimlquestion: A,
                    aimlanswer: answer,
                    topicname: aiml.topic,
                  })
                    .then(res => {
                      if ('error' in res) throw new Error(res.error);
                      if (!res) throw new Error('err');
                      else {
                        console.log('save aiml ok', res);
                        // noti ok;
                        this.addNotification(
                          'Save AIML Successfully',
                          'success'
                        );
                      }
                    })
                    .catch(error => {
                      this.addNotification(
                        `Something went wrong in AIML: "${error.message}"`,
                        'error'
                      );
                    });
                });
                setTimeout(() => {
                  dispatch(aimlActions.getDataRecentlyTable(aiml.topic));
                }, 1500);
              }}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <RecentlyTable />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(state => ({ aiml: state.aiml }))(
  withStyles(styles)(hot(AIML))
);
