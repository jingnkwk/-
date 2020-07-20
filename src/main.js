import Vue from 'vue'
import App from './App'
import {posting,geting} from "api/request.js"
import config from "static/js/conf/config.js"
Vue.config.productionTip = false
Vue.prototype.$posting=posting;
Vue.prototype.$geting=geting;
Vue.prototype.$config=config;
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
