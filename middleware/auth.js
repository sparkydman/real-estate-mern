import ErrorRes from '../utils/ErrorRes';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User';

export const requiredAuth = async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes('Access denied!, no token found', null, 401),
    });
  }
  token = token.split(' ')[1];

  try {
    const decode = jwt.verify(token, config.get('JWT_SECRET'));

    const user = await User.findOne({ _id: decode.id });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: new ErrorRes('Access denied!, invalid token', null, 401),
    });
  }
};

export const requiredRole = (...roles) => {
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
