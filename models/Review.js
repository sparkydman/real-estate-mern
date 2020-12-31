import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const ReviewShema = new mongoose.Schema({
  property: {
    type: ObjectId,
    ref: 'Property',
  },
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

const pupolateUser = function (next) {
  this.populate('user', '_id firstname lastname avatar');
  next();
};

ReviewShema.pre('find', pupolateUser).pre('findOne', pupolateUser);

ReviewShema.pre(
  'save',
  (ReviewShema.methods.getReviewType = function (type) {
    return function (next) {
      if (type === 'property') {
        this.agent = undefined;
      } else {
        this.property = undefined;
      }
      next();
    };
  })
);

export default mongoose.model('Review', ReviewShema);
