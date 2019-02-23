import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { mailActions } from '../../_actions';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

class MailBox extends React.Component {
  constructor(props) {
    super(props);
    email:'';
  }
  componentWillMount(){
      const {dataMail} = this.props.mailBox;
      this.setState({email:dataMail});
      
  }
  componentDidMount(){
    this.props.dispatch(mailActions.resetMail());  
  }
  render() {
  
    return (
      <div>
            <p>
                    {this.state.email}
            </p>
      </div>
    );
  }
}
MailBox.propTypes = {
    dispatch: PropTypes.func.isRequired,
    mailBox:PropTypes.object.isRequired,
  };
function mapStateToProps(state) {
    const { mailBox } = state;
    return {
        mailBox,
    };
  }

export default connect(
    mapStateToProps
)(withStyles(styles)(MailBox));
