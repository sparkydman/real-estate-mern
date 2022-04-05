const User = require('../../models/User');
const ErrorRes = require('../../utils/ErrorRes');
const { mailHandler } = require('../../utils/mail');
const { uploadImgToCloudinary } = require('../../utils/uploadFile');

module.exports = async (req, res) => {
  if (req.user.role !== 'admin') {
    if (
      req.body.role ||
      req.body.enable === true ||
      req.body.enable === false
    ) {
      return res.status(401).json({
        success: false,
        error: new ErrorRes(
          "Only the admin can update Role and Enable/Disable user's profile",
          null,
          401
        ),
      });
    }
  }
  if (req.body.enable !== undefined) {
    const disableHtml = `<div style="text-align:center"><p><strong>${req.profile.firstname} ${req.profile.lastname} </strong> your account has been suspended due to some of your activities that violet our <a href='${process.env.WEBSITE_URL}/policies' target='_black'>policies </a> </p></div>`;

    const enableHtml = `<div style="text-align:center"><p><strong>${req.profile.firstname} ${req.profile.lastname} </strong> your account is now active. Please keep the website <a href='${process.env.WEBSITE_URL}/policies' target='_black'>policies </a> so to avoid being block </p></div>`;

    const mailBody = {
      from: process.env.FROM_NAME,
      to: req.profile.email,
      subject:
        req.body.enable === false ? 'Account Suspended' : 'Account Activated',
      html: req.body.enable === false ? disableHtml : enableHtml,
    };

    mailHandler(mailBody);
  }
  if (req.body.role) {
    const mailBody = {
      from: process.env.FROM_NAME,
      to: req.profile.email,
      subject: 'New Role',
      text: `You are now assigned the role of ${req.body.role} in ${process.env.WEBSITE_URL}`,
    };

    mailHandler(mailBody);
  }

  if (req.file) {
    const result = await uploadImgToCloudinary(req.file, null, 100, 100);
    req.body.avatar = result.url;
  }
  const user = await User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { runValidators: true, new: true }
  );
  res.status(200).json({
    success: true,
    data: user,
  });
};
