import axios from 'axios';

let token = '';
if (localStorage.token) {
  token = localStorage.token;
}

const http = axios.create({
  baseURL: 'https://real-estate-space.herokuapp.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

export default http;
