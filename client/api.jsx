import axios from 'axios';

const api = axios.create({
  baseURL: 'https://leetquest.onrender.com/api',
});

export default api;