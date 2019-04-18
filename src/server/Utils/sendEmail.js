const sendEmail = async (toEmails, subject, content, html) => {
  const credentials = {
    user: 'devpython.dat@gmail.com',
    pass: 'dat182980',
    to: toEmails,
  };
  const result = false;
  const send = require('gmail-send')({
    user: credentials.user, // Your GMail account used to send emails
    pass: credentials.pass, // Application-specific password
    to: credentials.to,
    // from:    credentials.user,            // from: by default equals to user
    // replyTo: credentials.user,            // replyTo: by default undefined
    // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
    subject,
    text: content,
    html,
  });
  //   console.log('* [example 1.1] sending test email');
  return new Promise((resolve, reject) => {
    send({}, (err, res) => {
      if (err) {
        reject(`sendEmail err${err}`);
      } else {
        resolve(' send ok');
      }
    });
  });
};

module.exports = sendEmail;
