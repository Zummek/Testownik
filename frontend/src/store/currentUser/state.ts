import { CurrentUserState } from './types';

function state(): CurrentUserState {
  return {
    profile: null,
    auth: null,
  };
}

export default state;
