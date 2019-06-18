// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "@/core/store/index";
import "@/common/css/index.scss"
import 'lib-flexible/flexible.js'
import core from "@/core/core.config";
import VueLazyload from 'vue-lazyload';
import 'font-awesome/css/font-awesome.min.css'

Vue.use(core);
Vue.use(VueLazyload, {
  loading: require('@/assets/laz.jpg')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
