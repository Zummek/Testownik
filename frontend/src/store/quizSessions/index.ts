import { Module } from 'vuex';
import { State } from '../index';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { QuizSessions } from './types';

const exampleModule: Module<QuizSessions, State> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default exampleModule;
