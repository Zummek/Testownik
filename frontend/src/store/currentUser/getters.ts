import { GetterTree } from 'vuex';
import { State } from '../index';
import { CurrentUserState } from './types';

const getters: GetterTree<CurrentUserState, State> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
