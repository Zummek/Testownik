import axiosInstance from '../axiosInstance';
import * as types from './types';

export const getList = async () => {
  const response = await axiosInstance.get<types.QuizListResponse>('quizzes/');
  return response.data.data;
};

export const getDetails = async (id: number) => {
  const response = await axiosInstance.get<types.QuizDetailsResponse>(
    `quizzes/${encodeURIComponent(id)}`
  );
  return response.data.data;
};
