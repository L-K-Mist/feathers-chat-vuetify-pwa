const state = {
  showLoginGuide: false
};

const getters = {
  showLoginGuide: state => {
    return state.showLoginGuide;
  },
};

const mutations = {
  // Explicitly sets the state of isAuthenticated to true or false
  showLoginGuide: (state, payload) => {
    state.showLoginGuide = payload;
  },
};

const actions = {
  // Dialogue actions
  showLoginGuide: ({
    commit
  }, payload) => {
    commit('showLoginGuide', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
