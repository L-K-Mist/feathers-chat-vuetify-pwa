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
    // 
    async signUp({
      commit
    }, payload) {
      try {
        const newUser = await feathers.service('users').create(payload)
        const authNewUser = await feathers.authenticate({
          strategy: 'local',
          email: payload.email,
          password: payload.password
        })
        const verifyNewUser = await feathers.passport.verifyJWT(authNewUser.accessToken)
        //const fetchUserId = await feathers.service('users').get(verifyNewUser.id)
        console.log('New User: ', newUser)
        commit('setUser', payload);

      } catch (error) {
        console.log(error)
      }
    },
    async signInManually({
      commit
    }, payload) {
      try {
        const authExistingUser = await feathers.authenticate({
          strategy: 'local',
          email: payload.email,
          password: payload.password
        })
        const verifyExistingUser = await feathers.passport.verifyJWT(authExistingUser.accessToken)
        //const fetchUserId = await feathers.service('users').get(verifyNewUser.id)
        console.log('verifyExistingUser: ', verifyExistingUser)
        commit('setUser', payload);
      } catch (error) {
        console.log(error)
      }
    },
    async signInAuto({
      commit
    }) {
      try {
        const authExistingUser = await feathers.authenticate()
        const verifyExistingUser = await feathers.passport.verifyJWT(authExistingUser.accessToken)
        //const fetchUserId = await feathers.service('users').get(verifyNewUser.id)
        console.log('verifyExistingUser: ', verifyExistingUser)
        commit('setUser', payload);
      } catch (error) {
        console.log(error)

      }
    },

    // To just console log our users for now
    logUsers({
      commit
    }) {
      //	Find	the	10	newest user accounts
      feathers.service('users').find({
        query: {
          $limit: 10,
          $sort: {
            createdAt: -1
          }
        }
      }).then(users => console.log(users));
      // TODO: play with this sorting so that able to clean users of all but 1st created user: ie. Yourself
    },
    cleanUsers({
      commit
    }) {
      feathers.service('users').remove(null, {
        query: {
          $limit: 25,
          $sort: {
            createdAt: -1
          }
        }
      })
    }
  },
  modules: {
    // Place to add modularized store items
    chat
  }
});
