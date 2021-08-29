import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router/routes'
import VueApexCharts from 'vue-apexcharts'; 

Vue.config.productionTip = false
Vue.use(VueRouter) 
Vue.use(VueApexCharts)
Vue.component('vue-apexcharts', VueApexCharts);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

