const errorHandler = require('../../middleware/error');

module.exports = async (req, res) => {
  req.user = {};
  req.profile = {};
  res.status(200).clearCookie('token').json({
    success: true,
    data: 'You are logged out',
  });
};
