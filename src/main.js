import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.$apiUrl = (process.env.VUE_APP_ENV === 'local') ? process.env.VUE_APP_API_URL_TEST : process.env.VUE_APP_API_URL;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
