// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(MintUI)
Vue.use(VueResource);

/* eslint-disable no-new */

var app = new Vue({
	store, // inject store to all children
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})