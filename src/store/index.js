import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      isAuth: false,
      isCashier: false,
      isTourLeader: false,
      isTourCompany: false,
      data: []
    },
    overlay: false
  },
  getters: {
    auth(state) {
      return state.user
    },
    getUserData(state){
      return state.user.data
    },
    getOverlay(state){
      return state.overlay
    }
  },
  mutations: {
    logged(state){
      state.user.isAuth = true
    },
    logout(state){
      state.user.isAuth = false
      state.overlay = false;
    },
    setUser(state, user){
      state.user.data = user
    },
    setOverlay(state, boolean){
      state.overlay = boolean
    },
    setCashier(state){
      state.user.isCashier = true
    },
    setTourLeader(state){
      state.user.isTourLeader = true
    },
    setTourCompany(state){
      state.user.isTourCompany = true
    },
  },
  plugins: [createPersistedState()]
})
