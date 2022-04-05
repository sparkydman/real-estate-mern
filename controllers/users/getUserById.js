const mongoose = require('mongoose');
const User = require('../../models/User');
const ErrorRes = require('../../utils/ErrorRes');
const setQueryOptions = require('../../utils/setQueryOption');

module.exports = async (req, res, next, id) => {
  let role = req.user ? req.user.role : 'customer';
  const queryOptions = setQueryOptions(role, id);
  const user = await User.findOne(queryOptions);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('User not found', null, 404),
    });
  }
  req.profile = user;
  const profileId = mongoose.Types.ObjectId(req.profile._id);
  if (req.user && req.user._id !== undefined) {
    if (req.user._id.equals(profileId)) {
      req.isMyProfile = true;
      return next();
    }
    return next();
  }
  next();
};
