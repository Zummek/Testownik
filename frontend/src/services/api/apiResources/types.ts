export interface SignInWithGooglePayload {
  access_token: string;
  id_token: string;
}

export interface SignInWithGoogleResponse {
  access_token: string;
  refresh_token: string;
  user: {
    first_name: string;
    last_name: string;
    username: string;
  };
}
