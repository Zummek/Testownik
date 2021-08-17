import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { get, isNil } from 'lodash';
import { Notify } from 'quasar';
import { useStore } from '../../store';

const baseURL =
  (process.env.VUE_APP_SSL === 'true' ? 'https' : 'http') +
  `://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`;

const axiosInstance = axios.create({
  headers: {},
  baseURL,
});

const addToken = (config: AxiosRequestConfig) => {
  const accessToken = useStore().state.currentUser.auth?.accessToken;
  if (accessToken && config.url !== '/social-login/google/') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

// auth access token
axiosInstance.interceptors.request.use((request) => addToken(request));

// handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => handleResponseErrors(error)
);

const handleResponseErrors = (response: AxiosResponse) => {
  const status = get(response, 'response.status', 'no_status') as
    | string
    | number;

  const currentlyLoggedIn = !isNil(
    useStore().state.currentUser.auth?.accessToken
  );

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
        useStore().commit('currentUser/deleteTokens');
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
