import store from 'store/index'

/**
 * $.connection.hub 代理
 */
var hub = undefined;

/**
 * $.connection.<imHub名称>.client 代理
 */
var client = undefined;

/**
 * $.connection.<imHub名称>.server 代理
 */
var server = undefined;

/**
 * 尝试重新连接
 */
var tryingToReconnect = false;

/**
 * 初始化-生命周期事件
 * @param {Object} _hub
 */
const init_lifetime = function(_hub) {
	hub = _hub;

	hub.starting(starting);
	hub.received(received);
	hub.connectionSlow(connectionSlow);
	hub.reconnecting(reconnecting);
	hub.reconnected(reconnected);
	hub.stateChanged(stateChanged);
	hub.disconnected(disconnected);
	hub.error(error);
};

/**
 * Starts the connection
 * （开始连接服务器）
 * @param {Object} _hub
 * @param {Object} _success
  */
const start = function(_hub,_successCallback) {
	hub = _hub;

	//连接服务器事件处理程序
	hub.start({ transport: ['webSockets', 'longPolling'] })
		.done(function() {
			console.log('现在 已连接, connection ID=' + hub.id);
			console.log("已连接, transport = " + hub.transport.name);
			_successCallback();
		})
		.fail(function() {
			console.log('不能够连接!');
		});
};

/**
 * Adds a callback that will be invoked before anything is sent over the connection
 * （添加一个回调函数，该调用将在连接之前发送任何消息 ）
 * @param {Object} connection
 */
const starting = function(connection) {};

/**
 * Adds a callback that will be invoked after anything is received over the connection
 * （添加一个回调函数，该调用将在连接上接收到任何消息后调用 ）
 * @param {Object} connection
 * @param {Object} data
 */
const received = function(connection, data) {};

/**
 * Adds a callback that will be invoked when the client detects a slow connection
 * （添加一个回调，当客户端检测到慢速连接时将调用 ）
 * @param {Object} connection
 */
const connectionSlow = function(connection) {
	console.log('连接缓慢~~~~(>_<)~~~~');
};

/**
 * Adds a callback that will be invoked when the underlying transport begins reconnecting
 * （添加一个回调函数将被调用时，底层传输开始重新连接 ）
 * @param {Object} connection
 */
const reconnecting = function(connection) {
	tryingToReconnect = true;
	console.log('正在重新连接...');
};

/**
 * Adds a callback that will be invoked when the underlying transport reconnects
 * （添加一个回调函数将被调用时，底层的传输连接 ）
 * @param {Object} connection
 */
const reconnected = function(connection) {
	console.log('重新连接成功O(∩_∩)O~');
	tryingToReconnect = false;
};

/**
 * Adds a callback that will be invoked when the connection state changes
 * （添加连接状态更改时将调用的回调 ）
 * @param {Object} connection
 * @param {Object} data
 */
const stateChanged = function(connection, data) {};

/**
 * Adds a callback that will be invoked when the client disconnects
 * （添加一个回调函数将被调用时，客户端断开连接）
 * @param {Object} connection
 */
const disconnected = function(connection) {
	if(tryingToReconnect) {
		console.log('连接已经断开！！！');
	}

	if(hub.lastError) {
		console.log("断开连接. 原因: " + hub.lastError.message);
	}
	setTimeout(function() { start(); }, 30000); // 30秒后开始重新连接

};

/**
 * Adds a callback that will be invoked after an error occurs with the connection
 * （添加在连接发生错误后将调用的回调）
 * @param {Object} connection
 * @param {Object} errorData
 * @param {Object} sendData
 */
const error = function(connection, errorData, sendData) {
	console.log('SignalR 错误: ' + errorData);
};

export default{
	start,
	init_lifetime
}