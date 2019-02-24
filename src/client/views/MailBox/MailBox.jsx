import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { mailActions } from '../../_actions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { history } from '_helpers';
const styles = {
  btnEmail: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
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
  }
};
class MailBox extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      arrModal:[],
    }
  }
  onClickMesseage = async (id) =>{
      let arr=this.props.mailBox.dataMail;
      let arrModal=this.state.arrModal;
      if (arrModal[id]==undefined) arrModal[id]=true;
      else arrModal[id] = !arrModal[id];
      this.setState({arrModal})
      
      if (!arr[id].seen) {
        arr[id].seen=true;
        this.props.dispatch(mailActions.fixMail(arr));
      }
  }
  checkFomat(arr){
    if (arr==undefined) return [];
    else return arr;
  }
  render() {

    return (
      <div>
        <h2>
          Hộp thư đến
        </h2>
        {
          this.checkFomat(this.props.mailBox.dataMail).map((value, index) => {
            return (
              <div>
              <Button 
                  onClick={() => this.onClickMesseage(index)}
                  style={styles.btnEmail}>
                <Grid 
                  container
                  style={{maxWidth:"85%"}}
                  alignItems={'center'}
                  direction={"row"}>
                  <div style={{
                    borderRadius:"6px",width:"6px",
                    height:'6px',marginRight:'5px',
                    backgroundColor:value.seen ? 'white' : '#2196f3'
                  }}>

                  </div>
                  <p style={styles.textSender}>{value.sender}</p>
                  <Typography
                    noWrap={true}
                    style={styles.textContent}
                    variant="overline" gutterBottom>
                    {value.content}
                  </Typography>
                </Grid>
                <Typography
                  variant="overline" gutterBottom>
                  {value.time}
                </Typography>
              </Button>
              {
                this.state.arrModal[index]===true && 
                <div style={{paddingLeft:'3%',backgroundColor: '#f5f5f5',border:1,borderRadius:"3px",paddingTop:'5px',paddingBottom:'5px'}}>
                      <p style={{fontWeight:'bold'}}>Chi tiết</p>
                      <p>
                        Nội dung: {value.content} 
                      </p>
                      <p>
                        Địa điểm xảy ra tấn công: {value.location} 
                      </p>
                      <p>
                        Thời gian: {value.time} 
                      </p>
                </div> 
              }
            </div>        
            )
          })
        }
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
)(withStyles(styles)(MailBox));
