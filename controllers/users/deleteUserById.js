const User = require('../../models/User');
const { mailHandler } = require('../../utils/mail');
const { destroyImage } = require('../../utils/uploadFile');
const ErrorRes = require('../../utils/ErrorRes');

module.exports = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('User not found', null, 404),
    });
  }
  destroyImage(user.avatar);
  if (user.properties.length > 0) {
    const userPropertImages = user.properties.map(
      (property) => property.images
    );
    userPropertImages[0].forEach((image) => destroyImage(image.url));
  }

  if (req.user.role === 'admin') {
    const disableHtml = `<div style="text-align:center"><p><strong>${user.firstname} ${user.lastname} </strong> your account has been deleted due to some of your activities that violet our <a href='${process.env.WEBSITE_URL}/policies' target='_black'>policies </a> </p></div>`;

    const mailBody = {
      from: process.env.FROM_NAME,
      to: user.email,
      subject: 'Account delete',
      html: disableHtml,
    };

    mailHandler(mailBody);

    await user.remove();

    return res.status(200).json({
      success: true,
      data: 'The user was deleted',
    });
  }
  await user.remove();
};
