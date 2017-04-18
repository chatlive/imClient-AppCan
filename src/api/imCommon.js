import store from 'store/index'
import imSignalR from 'api/imConfig'

/**
 * 获取登录标识
 */
const getApp__Account = function() {
	let appID = imSignalR.AppID;
	let account = store.state.system.user.account;
	let who = imSignalR.App__Account(appID, account);
	return who;
}

export default {
	getApp__Account,
}