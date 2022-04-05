const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ReviewShema = new mongoose.Schema({
  agent: {
    type: ObjectId,
    ref: 'User',
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'Text is required for review'],
  },
  likes: [{ type: ObjectId, ref: 'User' }],
  dis_likes: [{ type: ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now() },
});

ReviewShema.index({ agent: 1 }, { unique: true });

const pupolateUser = function (next) {
  this.populate('user', '_id firstname lastname avatar');
  next();
};

ReviewShema.pre('find', pupolateUser).pre('findOne', pupolateUser);

module.exports = mongoose.model('Review', ReviewShema);
