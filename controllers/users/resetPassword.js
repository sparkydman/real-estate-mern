const crypto = require('crypto');
const User = require('../../models/User');
const ErrorRes = require('../../utils/ErrorRes');
const sendClientToken = require('./sendClientToken');
const { mailHandler } = require('../../utils/mail');

module.exports = async (req, res) => {
  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(403).json({
      success: false,
      error: new ErrorRes(
        'Invalid Token, maybe your token has expired',
        null,
        403
      ),
    });
  }
  const { password, confirmPassword } = req.body;
  user.password = password;
  user.confirmPassword = confirmPassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save();

  const mailBody = {
    from: process.env.FROM_NAME,
    to: user.email,
    subject: 'Password Reset',
    text: 'Your Password reset was successful',
  };
  mailHandler(mailBody);

  sendClientToken(user, 200, res);
};
