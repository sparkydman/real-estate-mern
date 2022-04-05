const User = require('../../models/User');
const { uploadImgToCloudinary } = require('../../utils/uploadFile');
const { mailHandler } = require('../../utils/mail');
const sendClientToken = require('./sendClientToken');

module.exports = async (req, res) => {
  const user = new User(req.body);
  if (req.file) {
    const result = await uploadImgToCloudinary(req.file, null, 100, 100);
    user.avatar = result.url;
  }
  await user.save();
  req.user = user;

  const mailBody = {
    from: process.env.FROM_NAME,
    to: user.email,
    subject: 'Registration completed',
    text: `Thank you for registering with us!. \n\nIn ${process.env.WEBSITE_URL} you will find your dream home that suits your budget.`,
  };

  mailHandler(mailBody);
  sendClientToken(user, 200, res);
};
