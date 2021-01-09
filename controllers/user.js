import mongoose from 'mongoose';
import User from '../models/User.js';
import ErrorRes from '../utils/ErrorRes.js';
import { destroyImage, uploadImgToCloudinary } from '../utils/uploadFile.js';

export const register = async (req, res) => {
  const user = new User(req.body);
  user.role = 'customer';
  if (req.file) {
    const result = await uploadImgToCloudinary(req.file, null, 100, 100);
    user.avatar = result.url;
  }
  await user.save();
  req.user = user;
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
    return res.status(403).json({
      success: false,
      error: new ErrorRes('Invalid email or password', null, 404),
    });
  }
  req.user = user;
  sendClientToken(user, 200, res);
};

// send token to client cookie
const sendClientToken = async (user, code, res) => {
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

  res
    .status(code)
    .cookie('token', token, option)
    .json({ success: true, token });
};

export const getAllUsers = async (req, res) => {
  res.status(200).json(res.queryResults);
};
export const getAllSearchedUsers = async (req, res) => {
  const keywords = req.params.keywords
    ? {
        $or: [
          {
            firstname: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            lastname: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
        ],
      }
    : {};
  const user = await User.find({ ...keywords });

  res.status(200).json({
    success: true,
    count: user.length,
    data: user,
  });
};

export const getUserById = async (req, res, next, id) => {
  const user = await User.findOne({ _id: id });
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

export const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    data: user,
  });
};

export const getLoggedUser = async (req, res) => {
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

export const updateProfile = async (req, res) => {
  if (req.user.role !== 'admin' && req.body.role) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes('Role is asigned by the admin', null, 401),
    });
  }
  if (req.file) {
    const result = await uploadImgToCloudinary(req.file, null, 100, 100);
    req.body.avatar = result.url;
  }
  const user = await User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { runValidators: true, new: true }
  );
  res.status(200).json({
    success: true,
    data: user,
  });
};

export const logout = (req, res) => {
  req.user = {};
  req.profile = {};
  res.status(200).clearCookie('token').json({
    success: true,
    data: 'You are logged out',
  });
};

export const deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.profile._id });
  destroyImage(user.avatar);
  logout(req, res);
};

export const changePassword = async (req, res) => {
  const user = await User.findOne({ _id: req.profile.id }).select('+password');

  if (!(await user.isPassword(req.body.password))) {
    return res.status(403).json({
      success: false,
      error: new ErrorRes('Password not correct', null, 403),
    });
  }

  await user.set({
    password: req.body.newPassword,
    confirmPassword: req.body.confirmPassword,
  });
  await user.save();
  logout(req, res);
};

export const changeEmail = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(403).json({
      success: false,
      error: new ErrorRes('Email already exist', null, 403),
    });
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.profile.id },
    { $set: { email: req.body.email } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
};

export const authenticate = (req, res, next) => {
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
