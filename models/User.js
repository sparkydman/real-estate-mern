const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
    enable: { type: Boolean, enum: [true, false], default: true },
    rating: { type: Number, default: 0 },
    badge: {
      type: String,
      enum: ['Novies', 'Amateur', 'Intermidate', 'Master', 'Professional'],
      default: 'Novies',
    },
    bio: { Type: String },
    createdAt: { type: Date, default: Date.now() },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
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

// UserShema.virtual('properties', {
//   ref: 'Property',
//   localField: '_id',
//   foreignField: 'agent',
//   justOnce: false,
// });
// UserShema.virtual('reviews', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'agent',
//   justOnce: false,
// });

UserShema.index({ firstname: 'text', lastname: 'text' });

const autoPoputlateReviewAndProperties = function (next) {
  this.populate('reviews', '_id text user');
  this.populate('properties', '_id title images -agent');
  next();
};

UserShema.pre('find', autoPoputlateReviewAndProperties).pre(
  'findOne',
  autoPoputlateReviewAndProperties
);

// match password for logging in
UserShema.methods.isPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

UserShema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

UserShema.methods.setResetPassword = function () {
  // Create the token
  const resetToken = crypto.randomBytes(20).toString('hex');
  // Hash the password and save to resetPassword field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  // Set expiration to 10 minute
  this.resetPasswordTokenExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

UserShema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ agent: this._id });
  await this.model('Property').deleteMany({ agent: this._id });
  next();
});

module.exports = mongoose.model('User', UserShema);
