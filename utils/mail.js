const nodemailer = require('nodemailer');
// import dotenv from 'dotenv';
// dotenv.config()

const mailHandler = async ({
  from,
  to,
  subject = '',
  text = '',
  html = '',
}) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  console.log('Message sent: %s', info.messageId);
};

module.exports = { mailHandler };
