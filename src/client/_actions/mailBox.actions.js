import { mailBoxConstans } from '../_constants';

function addMail(dataMail,message) {
  
  let res=dataMail;
  res.push(message);  
  return { 
      type: mailBoxConstans.ADD_EMAIL,
      dataMail:res 
    };
}
function resetMail() {
    return { 
        type: mailBoxConstans.RESET_EMAIL,
        dataMail:[] 
      };
  }
  function fixMail(dataMail) {
    console.log("====>>>> xem co vao fixMail ko nhe",dataMail);
    return { 
        type: mailBoxConstans.FIX_EMAIL,
        dataMail:dataMail
      };
  }
export const mailActions = {
    addMail,
    resetMail,
    fixMail,
};
