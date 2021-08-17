import { MutationTree } from 'vuex';
import { Auth, CurrentUser, CurrentUserState } from './types';

const mutation: MutationTree<CurrentUserState> = {
  setCurrentUser(state: CurrentUserState, payload: CurrentUser) {
    state.auth = payload.auth;
    state.profile = payload.profile;
  },
  setAccessToken(state: CurrentUserState, accessToken: Auth['accessToken']) {
    if (state.auth) state.auth.accessToken = accessToken;
    else state.auth = { accessToken, refreshToken: null };
  },
  setRefreshToken(state: CurrentUserState, refreshToken: Auth['refreshToken']) {
    if (state.auth) state.auth.refreshToken = refreshToken;
    else state.auth = { refreshToken, accessToken: null };
  },
  deleteTokens(state: CurrentUserState) {
    state.auth = null;
  },
  setPairTokens(state: CurrentUserState, payload: Auth) {
    state.auth = payload;
  },
  clearCurrentUser(state: CurrentUserState) {
    state.auth = null;
    state.profile = null;
  },
};

export default mutation;
