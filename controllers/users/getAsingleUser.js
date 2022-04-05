const User = require('../../models/User');
const setQueryOption = require('../../utils/setQueryOption');

module.exports = async (req, res) => {
  let role = req.user ? req.user.role : 'customer';
  const queryOptions = setQueryOption(role, req.params.id);

  const user = await User.findOne(queryOptions);
  res.status(200).json({
    success: true,
    data: user,
  });
};
