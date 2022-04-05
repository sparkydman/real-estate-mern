const User = require('../../models/User');
const ErrorRes = require('../../utils/ErrorRes');
const { mailHandler } = require('../../utils/mail');

module.exports = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Email does not exist', 'email', 404),
    });
  }
  try {
    const resetToken = await user.setResetPassword();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.WEBSITE_URL}/forgot-password/${resetToken}`;
    const emailBody = {
      from: process.env.FROM_NAME,
      to: email,
      subject: 'Forgot Password',
      html: `<div style="text-align: center">
      <p>You are receiving this email because you requested to reset your password, if you are not aware of this ignore.</p></br>
      <a href="${resetUrl}" style="display: inline-block; background-color: #000; color:#fff; padding: 5px; text-decoration:none" target="_black">Reset password</a></div>`,
    };
    mailHandler(emailBody);
    res.status(200).json({
      success: true,
      data: 'Mail sent',
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      success: false,
      error: new ErrorRes('Mail not sent', null, 500),
    });
  }
};
