import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  search: {
    query: '로드중입니다...',
    class: '',
  },
  getters: {
    getSearch(){
      return this.search
    }
  }
});