import axios from 'axios';

const http = axios.create({
  baseURL: 'https://real-estate-space.herokuapp.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
