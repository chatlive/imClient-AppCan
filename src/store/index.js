import Vue from 'vue'
import Vuex from 'vuex'

import IMCHAT from './modules/imchat/index'
import SYSTEM from './modules/system/index'

Vue.use(Vuex)

let store = new Vuex.Store({
	modules: {
		imchat: IMCHAT,
		system: SYSTEM
	},
	strict: true,
	plugins: false ? [createLogger()] : []
})

//store.watch(
//	(state) => state.imchat.sessions,
//	(val) => {
//		console.log('CHANGE: ', val);
//		localStorage.setItem('vue-chat-session', JSON.stringify(val));
//	}, { deep: true }
//);

export default store