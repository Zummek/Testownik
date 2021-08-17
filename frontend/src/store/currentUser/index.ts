import { Module } from 'vuex';
import { State } from '../index';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { CurrentUserState } from './types';

const exampleModule: Module<CurrentUserState, State> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default exampleModule;
