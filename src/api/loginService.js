import SYSTEM_TYPES from 'store/modules/system/types'
import STORE from 'store/index'
import CHAT from 'api/imService'
import APPAPPCAN from 'api/appAppCan'
import jquery from 'jquery'
import baseUrl from 'api/baseUrl'

/**
 * CHAT初始化回调
 */
const chat_successCallback = function() {
	CHAT.FriendGroup.fG_GetGroups();
	CHAT.FriendGroup.fG_GetFriends();
	CHAT.Chatter.chatter_ChatterInfo();
	APPAPPCAN.init();
}

/**
 * 登录
 * @param {Object} appKey
 * @param {Object} account
 * @param {Object} page_Callback
 */
const login = function(appKey, account, page_Callback) {
	let param = {
		appKey: appKey,
		account: account
	};
	jquery.get(baseUrl.loginUrl, param).then(function(resp) {
		console.log(resp);

		let data = resp;
		if(data.status) {
			let user = {
				appID: appKey,
				account: data.user.account,
				name: data.user.name,
				img: data.user.img
			}
			STORE.commit(SYSTEM_TYPES.sys_mutation_setUser, user);
			CHAT.initialize(STORE.state.system.user.account, STORE.state.system.APPID, chat_successCallback);
		}
		page_Callback(data);

	}, function(resp) {
		console.log(resp);
	});
}

/**
 * 登录服务
 */
const loginService = {
	login,
};

export default loginService