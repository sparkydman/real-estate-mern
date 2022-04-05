const ErrorRes = require('../utils/ErrorRes');

module.exports = (req, res, next) => {
  if (!req.profile) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Profile not found', null, 404),
    });
  }
  if (req.user.role !== 'admin' && !req.isMyProfile) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes('You are not authorize', null, 401),
    });
  }
  next();
};
