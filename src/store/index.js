import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      isAuth: false,
      data: []
    }
  },
  getters: {
    auth(state) {
      return state.user
    },
    getUserData(state){
      return state.user.data
    }
  },
  mutations: {
    logged(state){
      state.user.isAuth = true
    },
    logout(state){
      state.user.isAuth = false
    },
    setUser(state, user){
      state.user.data = user
    }
  },
  plugins: [createPersistedState()]
})
