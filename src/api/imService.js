import store from 'store/index'
import init_client from 'api/imApiClient'
import map_service from 'api/imApiServer'
import imSignalR from 'api/imConfig'
import imLifetime from 'api/imLifetime'

/**
 * $.connection.hub 代理
 */
var hub = $.connection.hub;

/**
 * $.connection.<imHub名称>.client 代理
 */
var client = $.connection.imHub.client;

/**
 * $.connection.<imHub名称>.server 代理
 */
var server = $.connection.imHub.server;

/**
 * imService（供给各个组件调用的API）
 */
const imService = {};

/**
 * 初始化服务(连接通讯)
 * @param {String} account 账户标识
 * @param {Object} appID 应用程序ID
 * @param {Object} successCallback 连接成功处理函数
 */
const _initialize = function(account, appID, successCallback) {

	//hub远程地址
	hub.url = imSignalR.url;
	//hub连接queryString参数集合
	hub.qs = imSignalR.qs(appID, account);
	//hub控制台日志功能
	hub.logging = imSignalR.logging;

	//注册hub生命周期事件
	imLifetime.init_lifetime(hub);
	//注册client事件
	init_client(hub, client);
	//映射server到imService事件
	map_service(hub, server, imService);
	//开启hub
	imLifetime.start(hub, successCallback);
};

/**
 * 初始化服务
 */
imService.initialize = _initialize;

/**
 * imService（供给各个组件调用的API）
 */
export default imService