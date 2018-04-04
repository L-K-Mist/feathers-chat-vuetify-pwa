import Vue from 'vue'
import Vuex from 'vuex'
import feathers from '@/api/feathers-client'
import userGuide from './modules/userGuide'

feathers.service('messages').on('created', value => {
  store.dispatch('pushHumanMessage', value) // Called this pushHumanMessage, because my own version also has arduino sending messages to clients.
})

// Keeping Authentication here front and center. The rest in modules.
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    isConnecting: false,
    users: null,
    messages: null,
    hasMoreMessages: false,
    sliderOne: 0,
    //skip = 0,
  },
  getters: {
    user: state => {
      return state.user;
      console.log('Get User: ', state.user)
    },
    users: state => {
      return state.users;
      console.log('Get User: ', state.users)
    },
    messages: state => {
      return state.messages
    },
    isAuthenticated: state => {
      return state.isAuthenticated
    }
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
    },
    setUsers: (state, payload) => {
      state.users = payload
    }

  },
  actions: {
    // 
    async signUp({
      commit
    }, payload) {
      try {
        const newUser = await feathers.service('users').create(payload) // Tell feathers to create a new user.
        const authNewUser = await feathers.authenticate({ // Authenticate this user towards logging them in. This results in an Access Token
          strategy: 'local',
          email: payload.email,
          password: payload.password
        })
        const verifyNewUser = await feathers.passport.verifyJWT(authNewUser.accessToken) // The Access Token created above is used to verify the user.
        //const fetchUserId = await feathers.service('users').get(verifyNewUser.id)
        console.log('New User: ', newUser)
        commit('setUser', newUser); // This client will have fetchUser as it's active user.
      } catch (error) {
        console.log(error)
      }
    },
    async signInManually({ // For the case where user has already signed up, but the signInAuto hasn't worked
      commit,
      dispatch
    }, payload) {
      try {
        const authExistingUser = await feathers.authenticate({
          strategy: 'local',
          email: payload.email,
          password: payload.password
        })
        const verifyExistingUser = await feathers.passport.verifyJWT(authExistingUser.accessToken) // Feathers verifyJWT then uses the access token created for this new user to log them in.
        const fetchUser = await feathers.service('users').get(verifyExistingUser.userId) // We then fetch this user to make sure all is well. This could also be used to push a new user onto a list of users.
        console.log('verifyExistingUser: ', fetchUser)
        commit('setUser', fetchUser); // This client will have fetchUser as it's active user.
        commit('setIsAuthenticated', true)
      } catch (error) {
        commit('setIsAuthenticated', false) // The sign in didn't work, so the user is NOT authenticated
        dispatch('showLoginGuide', true) // Let the user decide again whether they want to Sign Up or Sign in
        console.log(error)
      }
    },
    async signInAuto({ // This is triggered when App.vue is mounted. Attempts to authenticate using the locally stored JWT (Javascript Web Token)
      commit,
      actions
    }) {
      try {
        const authExistingUser = await feathers.authenticate()
        const verifyExistingUser = await feathers.passport.verifyJWT(authExistingUser.accessToken)
        const fetchUser = await feathers.service('users').get(verifyExistingUser.userId)
        console.log('verifyExistingUser: ', verifyExistingUser.userId)
        console.log('signInAuto user: ', fetchUser)
        commit('setUser', fetchUser)
        commit('setIsAuthenticated', true)
      } catch (error) {
        console.log(error)
        commit('showLoginGuide', true)

      }
    },
    async logOut({
      commit
    }) {
      try {
        const logout = await feathers.logout()
        console.log('logout ', logout)
        commit('setUser', null)
        commit('setIsAuthenticated', false)
      } catch (error) {
        console.log(error)
      }
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
    async fetchUsers({
      commit
    }) {
      //	Find	the	10	newest user accounts
      const users = await feathers.service('users').find({
        query: {
          $limit: 25,
          $sort: {
            name: -1
          },
        }
      });
      commit('setUsers', users.data)
      console.log('setUsers', users.data)
      // TODO: play with this sorting so that able to clean users of all but 1st created user: ie. Yourself
    },
    cleanUsers({ // If you want to start fresh with no persisted users, then call this action via this.$store.dispatch('cleanUsers')
      commit
    }) {
      feathers.service('users').remove(null, { // DANGEROUS ACTION: Deletes users from db
        query: {
          $limit: 50,
          $sort: {
            createdAt: -1
          },
        }
      })
    },
    async sendMessage({
      commit,
    }, payload) {
      const sendMessage = await feathers.service('messages').create({
        text: payload
      });
    },
    pushHumanMessage({
      commit,
      state
    }, payload) {
      state.messages.push(payload)
    }
  },
  modules: {
    // Place to add modularized store items
    userGuide,
  }
})
