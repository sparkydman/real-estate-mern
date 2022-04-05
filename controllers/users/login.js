const User = require('../../models/User');
const ErrorRes = require('../../utils/ErrorRes');
const sendClientToken = require('./sendClientToken');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  // Validate emil & password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: new ErrorRes('Email or Password can not be empty', null, 400),
    });
  }
  const user = await User.findOne({ email, enable: true }).select('+password');
  if (!user) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Invalid email or password', null, 404),
    });
  }
  if (!(await user.isPassword(password))) {
    return res.status(403).json({
      success: false,
      error: new ErrorRes('Invalid email or password', null, 404),
    });
  }
  req.user = user;
  sendClientToken(user, 200, res);
};
