export interface Auth {
  access: string | null;
  refresh: string | null;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  imageUrl: string;
}

export interface CurrentUser {
  profile: User | null;
  auth: Auth | null;
}

export type CurrentUserState = CurrentUser;
