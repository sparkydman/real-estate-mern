const User = require('../../models/User');
const ErrorRes = require('../../utils/ErrorRes');
const { mailHandler } = require('../../utils/mail');
const logout = require('./logout');

module.exports = async (req, res) => {
  const user = await User.findOne({ _id: req.profile.id }).select('+password');

  if (!(await user.isPassword(req.body.password))) {
    return res.status(403).json({
      success: false,
      error: new ErrorRes('Password not correct', null, 403),
    });
  }

  await user.set({
    password: req.body.newPassword,
    confirmPassword: req.body.confirmPassword,
  });

  const mailBody = {
    from: process.env.FROM_NAME,
    to: user.email,
    subject: 'Password Change',
    text: 'Your Password Change was successful',
  };
  mailHandler(mailBody);

  await user.save();
  logout(req, res);
};
