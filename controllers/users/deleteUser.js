const User = require('../../models/User');
const logout = require('./logout');
const { mailHandler } = require('../../utils/mail');
const { destroyImage } = require('../../utils/uploadFile');

module.exports = async (req, res) => {
  const user = await User.findOne({ _id: req.profile._id });
  destroyImage(user.avatar);
  if (req.profile.properties.length > 0) {
    const userPropertImages = req.profile.properties.map(
      (property) => property.images
    );
    userPropertImages[0].forEach((image) => destroyImage(image.url));
  }

  const disableHtml = `<div style="text-align:center"><p><strong>${req.profile.firstname} ${req.profile.lastname} </strong> your account has been deleted due to some of your activities that violet our <a href='${process.env.WEBSITE_URL}/policies' target='_black'>policies </a> </p></div>`;

  const mailBody = {
    from: process.env.FROM_NAME,
    to: req.profile.email,
    subject: 'Account delete',
    html: disableHtml,
  };

  mailHandler(mailBody);

  await user.remove();

  logout(req, res);
};
