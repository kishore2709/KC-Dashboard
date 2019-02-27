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
// actions
import { aimlActions } from '_actions';
//
import Grid from '@material-ui/core/Grid';
// hot

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
  render() {
    const { classes, aiml, dispatch } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} className={classes.Text2AIML}>
            <Questions
              onSubmit={({ members, answer }) => {
                members.forEach(({ Q, A }) => {
                  dispatch(
                    aimlActions.sendTextQuestion({
                      textquestion: Q,
                      textanswer: answer,
                      topicname: aiml.topic,
                      chatbotname: aiml.chatbot,
                      entityname: 'none',
                    })
                  );
                  dispatch(
                    aimlActions.sendAIMLQuestion({
                      aimlquestion: A,
                      aimlanswer: answer,
                      topicname: aiml.topic,
                    })
                  );
                  dispatch(aimlActions.getDataRecentlyTable(aiml.topic));
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <RecentlyTable />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  aiml: state.aiml,
}))(withStyles(styles)(AIML));
