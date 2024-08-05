import axios from 'axios';

const api = axios.create({
  baseURL: 'https://leetquest.onrender.com/api',
  withCredentials: true,
});

export default api;