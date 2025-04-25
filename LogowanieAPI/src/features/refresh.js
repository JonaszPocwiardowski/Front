import axios from 'axios';
import { store } from '../store';
import { refreshAccessToken } from '../features/AuthSlice';

axios.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;
    console.log('lolll');
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshAccessToken()); 
        console.log('token odswiezony');
        const newAccessToken = store.getState().auth.accessToken;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest); 
      } catch (err) {
        console.error("Błąd przy odświeżaniu tokenu:", err);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axios; 
