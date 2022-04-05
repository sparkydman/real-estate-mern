const ErrorRes = require('../../utils/ErrorRes');

module.exports = async (req, res) => {
  if (!req.isLoginUser) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes('You are not authorize', null, 401),
    });
  }
  res.status(200).json({
    success: true,
    data: req.user,
  });
};
