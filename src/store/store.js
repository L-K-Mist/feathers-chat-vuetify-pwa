import Vue from 'vue'
import Vuex from 'vuex'

// Include and set up feathers client
import Feathers from '@feathersjs/client'
import auth from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io('http://localhost:3030/', {
  transports: ['websocket'],
  forceNew: true
}) // TODO use env variables for production
const feathers = Feathers()
  .configure(socketio(socket))
  .configure(auth({
    storage: window.localStorage
  }))

// var createAccount = (email, password) => {
//   const userData = {
//     email,
//     password
//   };
//   return feathers.service('users').create(userData)
// }

// createAccount('d@bb.com', 'welink')
// console.log(createAccount)



import authentication from './modules/authentication'
import chat from './modules/chat'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {},
  },
  getters: {
    getUser: state => {
      return state.user;
      console.log('Get User: ', state.user)
    }
    //getDialogueBool: state => state.dialogue,
  },
  mutations: {
    setUser: (state, payload) => {
      state.setUser = payload;
    }
  },
  actions: {
    createUser: ({
      commit
    }, payload) => {
      const newUser = feathers.service('users').create(payload)
      console.log('New User: ', newUser)
      commit('setUser', payload);
    }
  },
  modules: {
    // Place to add modularized store items
    chat
  }
});
