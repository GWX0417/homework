import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')