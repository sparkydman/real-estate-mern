import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const DmShechema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Text is required'],
    trim: true,
  },
  from: {
    type: ObjectId,
    ref: 'User',
  },
  to: {
    type: ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const autoPopulateUser = function (next) {
  this.populate('to', '_id firstname lastname avatar');
  next();
};

DmShechema.pre('find', autoPopulateUser);

export default mongoose.model('Dm', DmShechema);
