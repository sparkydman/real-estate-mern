const User = require('../../models/User');
const ErrorRes = require('../../utils/ErrorRes');
const { mailHandler } = require('../../utils/mail');

module.exports = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(403).json({
      success: false,
      error: new ErrorRes('Email already exist', null, 403),
    });
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.profile.id },
    { $set: { email: req.body.email } },
    { new: true, runValidators: true }
  );
  const mailBody = {
    from: process.env.FROM_NAME,
    to: updatedUser.email,
    subject: 'Email change',
    text: `Your email has been change to ${updatedUser.email}`,
  };

  mailHandler(mailBody);

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
};
