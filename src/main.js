import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueHtmlToPaper from 'vue-html-to-paper';
import VueTheMask from 'vue-the-mask'
import VueCloneya from 'vue-cloneya'

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
      '/print.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.use(VueHtmlToPaper, options);
Vue.use(VueTheMask);
Vue.use(VueCloneya);

Vue.config.productionTip = false
Vue.prototype.$apiUrl = (process.env.VUE_APP_ENV === 'local') ? process.env.VUE_APP_API_URL_TEST : process.env.VUE_APP_API_URL;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
