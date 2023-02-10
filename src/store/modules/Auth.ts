import { Module } from 'vuex'
import { AuthState } from '@/types/Vuex'
import { User } from '@/types/User'

const Auth: Module<AuthState, any> = {
  state: {
    // TODO: initial user state should be null
    // send a request to check if the user is logged in
    // if yes, set the user state
    user: null,
    token: null
  },
  getters: {
    user(state) {
      return state.user
    },
    userId(state) {
      return state.user?._id
    },
    token(state) {
      return state.token
    },
    isLoggedIn(state) {
      return !!state.user
    }
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      // HTTP request to login
      // commit('setUser', user)
    }
  }
}

export default Auth
