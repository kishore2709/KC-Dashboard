import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

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
   
  }

  render() {
  
    return (
      <div>
            <h1>
                    huanthemen
            </h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(MailBox));
