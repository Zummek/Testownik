import { GetterTree } from 'vuex';
import { State } from '../index';
import { QuizSessionsState } from './types';

const getters: GetterTree<QuizSessionsState, State> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
