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

export interface QuizListResponse {
  data: {
    id: number;
    name: string;
    description: string;
    created: Date;
    modified: Date;
  }[];
}

export interface QuizDetailsResponse {
  data: {
    id: number;
    name: string;
    description: string;
    created: Date;
    modified: Date;
  };
}
