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
    console.log("====>>>> xem co vao resetMail ko nhe");
    return { 
        type: mailBoxConstans.RESET_EMAIL,
        dataMail:[] 
      };
  }

export const mailActions = {
    addMail,
    resetMail,
};
