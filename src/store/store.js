import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import authentication from './modules/authentication'
import chat from './modules/chat'

export const store = new Vuex.Store({
  state: {
    seeLogo: false,
  },
  getters: {
    seeLogoState: state => {
      return state.seeLogo;
    }
    //getDialogueBool: state => state.dialogue,
  },
  mutations: {
    setLogo: (state, payload) => {
      state.seeLogo = payload;
    }
  },
  actions: {
    setLogo: ({
      commit
    }, payload) => {
      commit('setLogo', payload);
    }

  },
  modules: {
    // Place to add modularized store items
    authentication,
    chat
  }

});
