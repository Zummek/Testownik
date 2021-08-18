import axiosInstance from '../axiosInstance';
import * as types from './types';

export const getTokenFromGoogle = async (accessToken: string) => {
  const response = await axiosInstance.post<types.SignInWithGoogleResponse>(
    'auth/google/login/',
    { access_token: accessToken }
  );
  return response.data;
};

export const getUserInfo = async () => {
  const response = await axiosInstance.get<types.GetUserInfoResponse>(
    'auth/user/'
  );
  return response.data;
};

export const refreshTokenFromGoogleURL = 'auth/google/refresh/';

export const refreshTokenFromGoogle = async (refreshToken: string) => {
  const response = await axiosInstance.post<types.PairAuthTokens>(
    refreshTokenFromGoogleURL,
    { refresh_token: refreshToken }
  );
  return response.data;
};
