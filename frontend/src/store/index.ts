import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import currentUser from './currentUser';
import { CurrentUserState } from './currentUser/types';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface State {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  currentUser: CurrentUserState;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<State>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<State>> = Symbol('vuex-key');

export default store(function (/* { ssrContext } */) {
  const Store = createStore<State>({
    modules: {
      currentUser,
    },
    plugins: [
      createPersistedState({
        paths: ['currentUser'],
      }),
    ],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
