const state = {
  isAuthenticated: false,
};

const getters = {
  isAuthenticated: state => {
    return state.isAuthenticated;
  },
};

const mutations = {
  // Explicitly sets the state of isAuthenticated to true or false
  setAuthenticationState: (state, payload) => {
    state.isAuthenticated = payload;
  },
};

const actions = {
  // Dialogue actions
  setAuthenticationState: ({
    commit
  }, payload) => {
    commit('setAuthenticationState', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
