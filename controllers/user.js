import User from '../models/User';
import ErrorRes from '../utils/ErrorRes';
import config from 'config';

export const register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  sendClientToken(user, 200, res);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // Validate emil & password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: new ErrorRes('Email or Password can not be empty', null, 400),
    });
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Invalid email or password', null, 404),
    });
  }
  if (!(await user.isPassword(password))) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Invalid email or password', null, 404),
    });
  }

  sendClientToken(user, 200, res);
};

// send token to client cookie
const sendClientToken = async (user, code, res) => {
  const token = await user.getSignedToken();

  const option = {
    expires: new Date(
      Date.now() + config.get('JWT_EXPIRATION') * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    option.secure = true;
  }

  res
    .status(code)
    .cookie('token', token, option)
    .json({ success: true, token });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
  });
};

export const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    data: user,
  });
};

export const getLoggedUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  res.status(200).json({
    success: true,
    data: user,
  });
};

export const updateProfile = async (req, res) => {
  let id;
  if (req.user.role === 'admin') {
    id = req.params.id;
  } else {
    id = req.user.id;
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { runValidators: true, new: true }
  );
  res.status(200).json({
    success: true,
    data: user,
  });
};

export const deleteUser = async (req, res) => {
  let id;
  if (req.user.role === 'admin') {
    id = req.params.id;
  } else {
    id = req.user.id;
  }
  await User.findOneAndDelete({ _id: id });
  res.status(200).json({
    success: true,
    data: 'deleted',
  });
};
