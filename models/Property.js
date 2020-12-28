import mongoose from 'mongoose';
import slugity from 'slugify';
import geocode from '../utils/geocode';

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [5, 'Title should not be less than 10 characters'],
    maxlength: [50, 'Title should not be more than 50 characters'],
    trim: true,
    unique: [true, 'Title you provided is already exist'],
  },
  slug: String,
  address: {
    type: String,
    required: [true, 'Address of the property is required'],
  },
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    state: String,
    city: String,
    country: String,
    countryCode: String,
    street: String,
    zipcode: String,
    streetNumber: Number,
    stateCode: String,
  },
  value_for: {
    type: String,
    enum: ['sale', 'rent'],
    required: [true, 'How the property is valued is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price of the property is required'],
  },
  condition: {
    type: String,
    enum: ['new', 'reconstructed', 'old', 'natural'],
    required: [true, 'Condition of the property is required'],
  },
  category: {
    type: String,
    enum: [
      'duplex',
      'bowngalow',
      'flat',
      'self - contain',
      'room',
      'attach',
      'container',
      'shop',
      'warehouse',
      'land',
    ],
    required: [true, 'Category of the property is required'],
  },
  compound_space: String,
  property_size: String,
  quantity: Number,
  imges: [{ type: String, size: Number }],
  desccription: {
    type: String,
    maxlength: [
      500,
      'Property description should not be more than 500 character',
    ],
    minlength: [
      10,
      'Property description should not be less than 10 character',
    ],
  },
  keywords: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// slugify the tiitle
PropertySchema.pre('save', function (next) {
  this.slug = slugity(this.title, { lower: true });
  next();
});

// gecode location
PropertySchema.pre('save', async function (next) {
  const loc = await geocode.geocode(this.address);

  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    country: loc[0].country,
    city: loc[0].city,
    street: loc[0].streetName,
    stateCode: loc[0].stateCode,
    countryCode: loc[0].countryCode,
    state: loc[0].state,
    streetNumber: loc[0].streetNumber,
    zipcode: loc[0].zipcode,
  };
  next();
});

export default mongoose.model('Property', PropertySchema);
