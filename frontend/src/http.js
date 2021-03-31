import axios from 'axios';

let token = '';
if (localStorage.token) {
  token = localStorage.token;
}

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://real-estate-space.herokuapp.com/api/v1/'
      : 'http://localhost:5500/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

export default http;
