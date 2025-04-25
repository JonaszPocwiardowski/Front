import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    refreshTokenSuccess: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
    },
  },
});


export const refreshAccessToken = () => async (dispatch, getState) => {
  const refreshToken = getState().auth.refreshToken;
  try {
    const response = await axios.post('https://dummyjson.com/auth/refresh', {
      refreshToken,
      expiresInMins: 1,
    });
    //console.log('użyto refresha');
    dispatch(refreshTokenSuccess({ accessToken: response.data.accessToken }));
  } catch (error) {
    console.error('Błąd przy odświeżaniu tokenu:', error);
  }
};

export const { loginSuccess, logout, refreshTokenSuccess } = authSlice.actions;
export default authSlice.reducer;