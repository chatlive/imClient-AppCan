import baseUrl from 'api/baseUrl'

/**
 * im通信基本参数
 */
var imSignalR = {};

/**
 * url
 * （$.connection.hub.url）
 */
imSignalR.url = baseUrl.imUrl;

/**
 * 控制台日志功能
 * （$.connection.hub.logging）
 */
imSignalR.logging = false;

/**
 * 获取登录标识
 * ($.connection.hub.qs 参数)
 * @param {String} appID App标识
 * @param {String} account 账户标识
 * @return {Object} 登录标识($.connection.hub.qs 参数)
 */
imSignalR.qs = function(appID, account) {
	var qs = {
		'HubKey_App': appID,
		'HubKey_Account': account
	};
	return qs;
};

/**
 * 获取登录标识
 * @param {String} appID App标识
 * @param {String} account 账户标识
 * @return {String} 登录标识(App__Account)
 */
imSignalR.App__Account = function(appID, account) {
	var appAccount = appID + '__' + account;
	return appAccount;
};

/**
 * im通信基本参数
 */
export default imSignalR