import geocoder from 'node-geocoder';
import config from 'config';

const option = {
  provider: config.get('GEO_CODE_PROVIDER'),
  apiKey: config.get('GEO_CODE_KEY'),
  httpAdapter: 'https',
  formatter: null,
};
const geocode = geocoder(option);

export default geocode;
