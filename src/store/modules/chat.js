const state = {
  messages: []
};

const getters = {
  getMessages: state => {
    return state.messages;
  },
};

const mutations = {
  // Explicitly sets the state of isAuthenticated to true or false
  setMessages: (state, payload) => {
    state.messages = payload;
  },
};

const actions = {
  // Dialogue actions
  setMessages: ({
    commit
  }, payload) => {
    commit('setMessages', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
