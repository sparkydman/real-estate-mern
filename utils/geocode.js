import geocoder from 'node-geocoder';
import dotenv from 'dotenv';

dotenv.config();

const option = {
  provider: process.env.GEO_CODE_PROVIDER,
  apiKey: process.env.GEO_CODE_KEY,
  httpAdapter: 'https',
  formatter: null,
};
const geocode = geocoder(option);

export default geocode;
