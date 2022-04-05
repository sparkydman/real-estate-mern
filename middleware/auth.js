const ErrorRes = require('../utils/ErrorRes.js');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const requiredAuth = async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token || !token.startsWith('Bearer')) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes('Access denied!, no token found', null, 401),
    });
  }
  token = token.split(' ')[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decode.id });

    req.user = user;
    req.isLoginUser = true;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: new ErrorRes('Access denied!, invalid token', null, 401),
    });
  }
};

const getme = async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    req.user = {};
    req.isLoginUser = false;
    return next();
  }
  if (token && !token.startsWith('Bearer')) {
    req.user = {};
    req.isLoginUser = false;
    return next();
  }
  try {
    token = token.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decode.id });
    req.user = user;
    req.isLoginUser = true;
    return next();
  } catch (err) {
    next();
  }
};

const requiredRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        error: new ErrorRes(
          `User with ${req.user.role} is not authorize to perform this action`,
          null,
          401
        ),
      });
    }
    next();
  };
};

module.exports = { requiredAuth, requiredRole, getme };
