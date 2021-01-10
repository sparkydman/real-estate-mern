import mongoose from 'mongoose';
import crypto from 'crypto';
import User from '../models/User.js';
import ErrorRes from '../utils/ErrorRes.js';
import { mailHandler } from '../utils/mail.js';
import { destroyImage, uploadImgToCloudinary } from '../utils/uploadFile.js';
import { setQueryOptions } from '../utils/setQueryOption.js';

export const register = async (req, res) => {
  const user = new User(req.body);
  // user.role = 'customer';
  if (req.file) {
    const result = await uploadImgToCloudinary(req.file, null, 100, 100);
    user.avatar = result.url;
  }
  await user.save();
  req.user = user;

  const mailBody = {
    from: process.env.FROM_NAME,
    to: user.email,
    subject: 'Registration completed',
    text: `Thank you for registering with us!. \n\nIn ${process.env.WEBSITE_URL} you will find your dream home that suits your budget.`,
  };

  mailHandler(mailBody);
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
  const user = await User.find({ enable: true, ...keywords });

  res.status(200).json({
    success: true,
    count: user.length,
    data: user,
  });
};

export const getUserById = async (req, res, next, id) => {
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

export const getSingleUser = async (req, res) => {
  let role = req.user ? req.user.role : 'customer';
  const queryOptions = setQueryOptions(role, req.params.id);

  const user = await User.findOne(queryOptions);
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
  if (req.user.role !== 'admin') {
    if (
      req.body.role ||
      req.body.enable === true ||
      req.body.enable === false
    ) {
      return res.status(401).json({
        success: false,
        error: new ErrorRes(
          "Only the admin can update Role and Enable/Disable user's profile",
          null,
          401
        ),
      });
    }
  }
  if (req.body.enable !== undefined) {
    const disableHtml = `<div style="text-align:center"><p><strong>${req.profile.firstname} ${req.profile.lastname} </strong> your account has been suspended due to some of your activities that violet our <a href='${process.env.WEBSITE_URL}/policies' target='_black'>policies </a> </p></div>`;

    const enableHtml = `<div style="text-align:center"><p><strong>${req.profile.firstname} ${req.profile.lastname} </strong> your account is now active. Please keep the website <a href='${process.env.WEBSITE_URL}/policies' target='_black'>policies </a> so to avoid being block </p></div>`;

    const mailBody = {
      from: process.env.FROM_NAME,
      to: req.profile.email,
      subject:
        req.body.enable === false ? 'Account Suspended' : 'Account Activated',
      html: req.body.enable === false ? disableHtml : enableHtml,
    };

    mailHandler(mailBody);
  }
  if (req.body.role) {
    const mailBody = {
      from: process.env.FROM_NAME,
      to: req.profile.email,
      subject: 'New Role',
      text: `You are now assigned the role of ${req.body.role} in ${process.env.WEBSITE_URL}`,
    };

    mailHandler(mailBody);
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
  const user = await User.findOne({ _id: req.profile._id });
  destroyImage(user.avatar);
  const userPropertImages = req.profile.properties.map(
    (property) => property.images
  );
  userPropertImages[0].forEach((image) => destroyImage(image.url));

  if (req.user.role === 'admin') {
    const disableHtml = `<div style="text-align:center"><p><strong>${req.profile.firstname} ${req.profile.lastname} </strong> your account has been deleted due to some of your activities that violet our <a href='${process.env.WEBSITE_URL}/policies' target='_black'>policies </a> </p></div>`;

    const mailBody = {
      from: process.env.FROM_NAME,
      to: req.profile.email,
      subject: 'Account delete',
      html: disableHtml,
    };

    mailHandler(mailBody);

    await user.remove();

    return res.status(200).json({
      success: true,
      data: 'The user was deleted',
    });
  }
  await user.remove();
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

  const mailBody = {
    from: process.env.FROM_NAME,
    to: user.email,
    subject: 'Password Change',
    text: 'Your Password Change was successful',
  };
  mailHandler(mailBody);

  await user.save();
  logout(req, res);
};

export const forgotPassword = async (req, res) => {
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

export const resetPassword = async (req, res) => {
  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(403).json({
      success: false,
      error: new ErrorRes(
        'Invalid Token, maybe your token has expired',
        null,
        403
      ),
    });
  }
  const { password, confirmPassword } = req.body;
  user.password = password;
  user.confirmPassword = confirmPassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save();

  const mailBody = {
    from: process.env.FROM_NAME,
    to: user.email,
    subject: 'Password Reset',
    text: 'Your Password reset was successful',
  };
  mailHandler(mailBody);

  sendClientToken(user, 200, res);
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
  const mailBody = {
    from: process.env.FROM_NAME,
    to: updatedUser.email,
    subject: 'Email change',
    text: `Your email has been change to ${updatedUser.email}`,
  };

  mailHandler(mailBody);

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
