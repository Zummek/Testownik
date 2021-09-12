import { Quiz, QuizListItem } from 'app/types/Quiz';
import { UserSettings } from 'app/types/User';

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
  data: UserSettings;
}

export type MeUpdateSettingRequest = {
  [x in keyof UserSettings]?: number;
};

export interface QuizListResponse {
  data: QuizListItem[];
}

export interface QuizDetailsResponse {
  data: Quiz;
}
