import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    search: {
      load: false,
      query: '로드중입니다...',
      label: '',
    },
  },
  getters: {
    getSearch: () => {
      return this.search
    }
  }
});