const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "aman.choudhary9785@gmail.com",
    subject: "Thanks for Joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
  });
};

const sendFarewellEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "aman.choudhary9785@gmail.com",
    subject: "Goodbye! User",
    text: `Thank you ${name}, for using our app. Let me know what could we have done to kept you from leaving.`,
  });
};
module.exports = {
  sendWelcomeEmail,
  sendFarewellEmail,
};
