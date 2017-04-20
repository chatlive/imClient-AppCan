import store from 'store/index'
import imSignalR from 'api/imConfig'
import loginService from 'api/loginService'

/**
 * 获取登录标识
 * @param {Object} appID 
 */
const getApp__Account = function(appID) {
	let account = store.state.system.user.account;
	let who = imSignalR.App__Account(appID, account);
	return who;
}

export default {
	getApp__Account,
}