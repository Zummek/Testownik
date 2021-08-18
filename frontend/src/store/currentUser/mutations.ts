import { MutationTree } from 'vuex';
import { Auth, CurrentUser, CurrentUserState } from './types';

const mutation: MutationTree<CurrentUserState> = {
  setCurrentUser(state: CurrentUserState, payload: CurrentUser) {
    state.auth = payload.auth;
    state.profile = payload.profile;
  },
  setAccessToken(state: CurrentUserState, access: Auth['access']) {
    if (state.auth) state.auth.access = access;
    else state.auth = { access, refresh: null };
  },
  setRefreshToken(state: CurrentUserState, refresh: Auth['refresh']) {
    if (state.auth) state.auth.refresh = refresh;
    else state.auth = { refresh, access: null };
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
