import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';

const instance = axios.create({
  baseURL: 'http://localhost:5120/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config.baseURL);
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
