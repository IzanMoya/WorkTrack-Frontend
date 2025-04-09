import axios from 'axios';
import { getFirebaseToken } from '../utils/firebaseToken';

const api = axios.create({
  baseURL: 'http://localhost:8080/worktrack',
});

api.interceptors.request.use(async (config) => {
  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
