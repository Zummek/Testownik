import axiosInstance from '../axiosInstance';
import * as types from './types';

export const signInWithGoogle = async (
  payload: types.SignInWithGooglePayload
) => {
  const response = await axiosInstance.post<types.SignInWithGoogleResponse>(
    'social-login/google/',
    payload
  );
  return response.data;
};
