import axios from 'axios';
import env from '../../env';

const api = axios.create({
  baseURL: __DEV__ ? env.dev.API_URL : env.prod.API_URL,
});

export default api;
