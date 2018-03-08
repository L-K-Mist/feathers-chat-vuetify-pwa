const state = {
  showLoginGuide: false,
  userRegister: false,
  userLogin: false,

};

const getters = {
  showLoginGuide: state => {
    return state.showLoginGuide;
  },
  userRegister: state => {
    return state.userRegister;
  },
  userLogin: state => {
    return state.userLogin;
  },
};

const mutations = {
  // Explicitly sets the state of isAuthenticated to true or false
  showLoginGuide: (state, payload) => {
    state.showLoginGuide = payload;
  },
  userRegister: (state, payload) => {
    state.userRegister = payload;
  },
  userLogin: (state, payload) => {
    state.userLogin = payload;
  },
};

const actions = {
  // Dialogue actions
  showLoginGuide: ({
    commit
  }, payload) => {
    commit('showLoginGuide', payload);
  },
  userRegister: ({
    commit
  }, payload) => {
    commit('userRegister', payload);
  },
  userLogin: ({
    commit
  }, payload) => {
    commit('userLogin', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
