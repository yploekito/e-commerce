import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.css'
import VueScrollReveal from 'vue-scroll-reveal'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueScrollReveal)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
