module.exports = async (user, code, res) => {
  const token = await user.getSignedToken();

  const option = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    option.secure = true;
  }
  let userObj = user.toObject();
  delete userObj.password;
  res
    .status(code)
    .cookie('token', token, option)
    .json({ success: true, user: userObj, token });
};
