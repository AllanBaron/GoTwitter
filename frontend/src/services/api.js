import axios from 'axios';
import configApp from '../config';

const api = axios.create({
  baseURL: configApp.SERVER_URL,
});

export default api;
