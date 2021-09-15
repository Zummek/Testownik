import { Quiz, QuizListItem } from 'app/types/Quiz';
import { QuizSettings } from 'app/types/User';

export interface SignInWithGoogleResponse extends PairAuthTokens {
  user: {
    first_name: string;
    last_name: string;
    username: string;
  };
}

export interface GetUserInfoResponse {
  email: string;
}

export interface PairAuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface MeGetSettingsResponse {
  data: QuizSettings;
}

export type MeUpdateSettingRequest = {
  [x in keyof QuizSettings]?: number;
};

export interface QuizListResponse {
  data: QuizListItem[];
}

export interface QuizDetailsResponse {
  data: Quiz;
}
