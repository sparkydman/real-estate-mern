const geocoder = require('node-geocoder');
const dotenv = require('dotenv');

dotenv.config();

const option = {
  provider: process.env.GEO_CODE_PROVIDER,
  apiKey: process.env.GEO_CODE_KEY,
  httpAdapter: 'https',
  formatter: null,
};
const geocode = geocoder(option);

module.exports = geocode;
