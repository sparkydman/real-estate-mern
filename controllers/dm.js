import Dm from '../models/Dm.js';
import User from '../models/User.js';
import ErrorRes from '../utils/ErrorRes.js';
import mongoose from 'mongoose';

export const postDm = async (req, res) => {
  req.body.from = req.user.id;
  const user = await User.findOne({ _id: req.params.to }).select(
    'firstname lastname avatar'
  );
  if (!user) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('User not found', null, 404),
    });
  }
  req.body.to = {
    user: user._id,
    avatar: user.avatar,
    firstname: user.firstname,
    lastname: user.lastname,
  };

  const { to, from, text } = req.body;

  const dm = new Dm({ to, from, text });

  await dm.save();
  res.status(200).json({
    success: true,
    data: dm,
  });
};

export const getDmById = async (req, res, next, id) => {
  const dm = await Dm.findOne({ _id: id });
  if (!dm) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Dm not found', null, 404),
    });
  }
  req.dm = dm;
  const dmFromId = mongoose.Types.ObjectId(req.dm.from.id);
  if (req.user && req.user._id !== undefined) {
    if (dmFromId.equals(req.user.id)) {
      req.isMyMsg = true;
      return next();
    }
    return next();
  }
  next();
};

export const deleteDm = async (req, res) => {
  if (!req.dm) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Dm not found', null, 404),
    });
  }
  if (!req.isMyMsg) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes('UnAuthorized to perform this action', null, 401),
    });
  }
  await Dm.findOneAndDelete({ _id: req.dm.id });
  res.status(200).json({
    success: true,
    data: 'Dm deleted',
  });
};

export const getAllDmToAndFrom = async (req, res) => {
  const dms = await Dm.find({ from: req.user.id, to: req.params.from });

  res.status(200).json({
    success: true,
    count: dms.length,
    data: dms,
  });
};
