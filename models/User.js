import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

const { ObjectId } = mongoose.Schema;

const UserShema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, 'First name is required'],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exist'],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    avatar: { type: String, default: 'avatar.jpg' },
    password: {
      type: String,
      select: false,
      required: [true, 'Password is required'],
      minlength: [5, 'Password must not be less than 5 characters'],
      validate: {
        validator: (v) => /^[a-zA-Z0-9]+$/i.test(v),
        message: () => 'Password should contain letters and numbers',
      },
    },
    confirmPassword: {
      type: String,
      required: [true, 'Confirm Password is required'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password does not match',
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\+234\d{10}/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid Nigeria phone number`,
      },
      required: [true, 'Phone number is required'],
    },
    role: {
      type: String,
      enum: ['customer', 'agent', 'admin'],
      default: 'customer',
    },
    rating: { type: Number, default: 0 },
    badge: {
      type: String,
      enum: ['Novies', 'Amateur', 'Intermidate', 'Master', 'Professional'],
      default: 'Novies',
    },
    // properties: [{ type: ObjectId, ref: 'Property' }],
    // reviews: [{ type: ObjectId, ref: 'Review' }],
    createdAt: { type: Date, default: Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserShema.pre('save', function (next) {
  if (
    (this.isModified('role') && this.role !== 'agent') ||
    this.role !== 'agent'
  ) {
    this.reviews = undefined;
    this.rating = undefined;
    this.badge = undefined;
    this.properties = undefined;
    next();
  }

  next();
});

UserShema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
});

UserShema.virtual('properties', {
  ref: 'Property',
  localField: '_id',
  foreignField: 'agent',
  justOnce: false,
});
UserShema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'agent',
  justOnce: false,
});

const autoPoputlateReviewAndProperties = function (next) {
  this.populate('reviews', '_id text user');
  this.populate('properties', '_id title, purchasedBy');
  next();
};

UserShema.pre('find', autoPoputlateReviewAndProperties).pre(
  'findOne',
  autoPoputlateReviewAndProperties
);

// const findOptions = function (next) {
//   if (this.role !== 'agent') {
//     this.select('-properties -badge -reviews -rating');
//     next();
//   }
//   next();
// };

// UserShema.pre('findOne', findOptions)
//   .pre('find', findOptions)
//   .pre('findOneAndUpdate', findOptions);

// match password for logging in
UserShema.methods.isPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

UserShema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, config.get('JWT_SECRET'), {
    expiresIn: config.get('JWT_EXPIRATION'),
  });
};

export default mongoose.model('User', UserShema);
