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
    user: String,
    avatar: String,
    firstname: String,
    lastname: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('Dm', DmShechema);
