import Dm from '../models/Dm';
import ErrorRes from '../utils/ErrorRes';
import { Types } from 'mongoose';

export const postDm = async (req, res) => {
  req.body.from = req.user.id;
  req.body.to = req.params.to;
  const dm = new Dm(req.body);

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
  const dmFromId = Types.ObjectId(req.dm.from.id);
  if (req.user && dmFromId.equals(req.user.id)) {
    req.isMyMsg = true;
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
