import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { isNil } from 'lodash';
import { Notify } from 'quasar';
import api from '.';
import store from '../../store';
import { refreshTokenFromGoogleURL } from './apiResources/auth';

const baseURL =
  (process.env.VUE_APP_SSL === 'true' ? 'https' : 'http') +
  `://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`;

const axiosInstance = axios.create({
  headers: {},
  baseURL,
});

const addToken = (config: AxiosRequestConfig) => {
  const accessToken = store.state.currentUser.auth?.access;
  if (accessToken && config.url !== refreshTokenFromGoogleURL) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

// auth access token
axiosInstance.interceptors.request.use((request) => addToken(request));

// handle errors and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest.url !== refreshTokenFromGoogleURL
    ) {
      const refreshToken = store.state.currentUser.auth?.refresh;
      if (refreshToken) {
        const tokens = await api.auth.refreshTokenFromGoogle(refreshToken);
        store.commit('currentUser/setPairTokens', {
          access: tokens.access_token,
          refresh: tokens.refresh_token,
        });
        return axiosInstance(originalRequest);
      }
    }
    return handleResponseErrors(error);
  }
);

const handleResponseErrors = (response: AxiosError) => {
  const status = response.response?.status || 'no_status';
  const currentlyLoggedIn = !isNil(store.state.currentUser.auth?.access);

  // We want to catch only "ugly" errors here. Resource errors (validation errors etc) should
  // be caught directly in the view.
  switch (status) {
    case 500:
    case 'no_status':
      Notify.create({
        color: 'negative',
        message:
          'We have trouble connecting to server. Please try again or contact the administrator.',
        icon: 'report_problem',
      });
      break;
    case 401:
      if (currentlyLoggedIn) {
        store.commit('currentUser/deleteTokens');
        Notify.create({
          color: 'positive',
          message: 'You were automatically logged out.',
        });
      }
      break;
    default:
      break;
  }
  return Promise.reject(response);
};

export default axiosInstance;
