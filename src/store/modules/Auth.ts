import { createStore } from 'vuex'
import { AuthState } from '@/types/Vuex'

export default createStore<AuthState>({
  state: {
    user: null,
    token: null
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    loggedIn: state => !!state.user
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
})
