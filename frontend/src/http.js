import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5500/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
