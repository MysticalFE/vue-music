// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
Vue.use(vueLazyLoad,{
	error: require('./common/images/logo.jpg'),
	loading: require('./common/images/logo.jpg')
})

Vue.config.productionTip = false
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
