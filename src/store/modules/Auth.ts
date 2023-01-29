import { Module } from 'vuex'
import { AuthState } from '@/types/Vuex'

const Auth: Module<AuthState, any> = {
  state: {
    user: null,
    token: null
  },
  getters: {
    user(state) {
      return state.user
    },
    token(state) {
      return state.token
    }
  },
  mutations: {
    setUser(state, user) {
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
