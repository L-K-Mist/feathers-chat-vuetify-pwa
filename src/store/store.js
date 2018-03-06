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
    user: null,
    isAuthenticated: false,
    isConnecting: false,
    user: null,
    messages: null,
    hasMoreMessages: false,
    //skip = 0,
  },
  getters: {
    getUser: state => {
      return state.user;
      console.log('Get User: ', state.user)
    },
    messages: state => {
      return state.messages
    }
    //getDialogueBool: state => state.dialogue,
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    },
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload
      console.log('setIsAuthenticated', state.isAuthenticated)
    },
    setMessages: (state, payload) => {
      state.messages = payload
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
        commit('setUser', newUser);

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
        const fetchUser = await feathers.service('users').get(verifyExistingUser.userId)
        console.log('verifyExistingUser: ', fetchUser)
        commit('setUser', fetchUser);
        commit('setIsAuthenticated', true)
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
        const fetchUser = await feathers.service('users').get(verifyExistingUser.userId)
        console.log('verifyExistingUser: ', verifyExistingUser.userId)
        console.log('current user: ', fetchUser)
        commit('setUser', fetchUser)
        commit('setIsAuthenticated', true)
      } catch (error) {
        console.log(error)

      }
    },
    async logOut({
      commit
    }) {
      try {
        const logout = await feathers.logout()
        console.log('logout ', logout)
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
          $limit: 50,
          $sort: {
            name: -1
          },
          // name: { // Just getting the log to exclude myself before cleaning up and deleting all except myself
          //   $nin: ['dylan']
          // }
        }
      }).then(users => console.log(users.data));
      // TODO: play with this sorting so that able to clean users of all but 1st created user: ie. Yourself
    },
    async fetchMessages({
      commit
    }) {
      //	Find	the	latest	25	messages.	They	will	come	with	the	newest	first
      //	which	is	why	we	have	to	reverse	before	adding	them
      const messages = await feathers.service('messages').find({
        query: {
          $sort: {
            createdAt: -1
          },
          $limit: 25
        }
      });
      //	We	want	to	show	the	newest	message	last
      const orderedMessages = messages.data.reverse()
      commit('setMessages', orderedMessages)
      console.log('orderedMessages', orderedMessages)

    },
    cleanUsers({
      commit
    }) {
      feathers.service('users').remove(null, { // DANGEROUS ACTION: Deletes users from db
        query: {
          $limit: 50,
          $sort: {
            createdAt: -1
          },
          name: { // want to delete all users except myself
            $nin: ['dylan']
          }
        }
      })
    },
    // TODO add messages actions
    async sendMessage({
      commit,
      getters
    }, payload) {
      const sendMessage = await feathers.service('messages').create({
        text: payload
      });
      console.log('sendMessage', sendMessage)
    }
  },
  modules: {
    // Place to add modularized store items
    chat
  }
});
