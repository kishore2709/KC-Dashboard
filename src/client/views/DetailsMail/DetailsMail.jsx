import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { mailActions } from '../../_actions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ar } from 'date-fns/esm/locale';
const styles = {
  btnEmail: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: '5px',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  textSender: {
    fontSize: "12px",
    fontWeight: 'bold',
    marginRight: '45px',
  },
  textContent: {
    fontSize: "12px",
    alignItems: "flex-start",
    maxWidth: '60%'
  },
};
class DetailsMail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div>
          <h2>
            Chi tiết thư
        </h2> 
      </div>
    );
  }
}
MailBox.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mailBox: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  const { mailBox } = state;
  return {
    mailBox,
  };
}

export default connect(
  mapStateToProps
)(withStyles(styles)(DetailsMail));
