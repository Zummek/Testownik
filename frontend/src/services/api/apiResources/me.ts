import axiosInstance from '../axiosInstance';
import * as types from './types';

export const getSettings = async () => {
  const response = await axiosInstance.get<types.MeGetSettingsResponse>(
    'me/settings/'
  );
  return response.data.data;
};

export const updateSetting = async (data: types.MeUpdateSettingRequest) => {
  await axiosInstance.patch('me/settings/', data);
};
