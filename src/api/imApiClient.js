import STORE from 'store/index'
import TYPES from 'store/modules/imchat/types'
import IMCOMMON from 'api/imCommon'

/**
 * $.connection.hub 代理
 */
let hub = undefined;

/**
 * $.connection.<imHub名称>.client 代理
 */
let client = undefined;

/**
 * $.connection.<imHub名称>.server 代理
 */
let server = undefined;

/**
 * 初始化-客户端api(供服务端调用)
 * @param {Object} _hub ($.connection.hub 代理)
 * @param {Object} _client ($.connection.<imHub名称>.client 代理)
 */
const init_client = function(_hub, _client) {
	hub = _hub;
	client = _client;

	/**********************服务端映射************************/
	client.chatter_ChatterInfo = chatter_ChatterInfo;
	client.chatter_ResetUnreadMsg = chatter_ResetUnreadMsg;
	client.stopClient = stopClient;
	client.fG_GetContacts = fG_GetContacts;
	client.fG_GetFriends = fG_GetFriends;
	client.fG_GetGroups = fG_GetGroups;
	client.group_SendFile = group_SendFile;
	client.group_SendHasRead = group_SendHasRead;
	client.group_SendNotice = group_SendNotice;
	client.group_SendPicture = group_SendPicture;
	client.group_SendText = group_SendText;
	client.gM_AddUsers = gM_AddUsers;
	client.gM_Create = gM_Create;
	client.gM_Delete = gM_Delete;
	client.gM_Exit = gM_Exit;
	client.gM_GetGroups = gM_GetGroups;
	client.gM_GroupInfo = gM_GroupInfo;
	client.gM_RemoveUsers = gM_RemoveUsers;
	client.his_GroupHistory = his_GroupHistory;
	client.his_QueryGroup = his_QueryGroup;
	client.his_QuerySingle = his_QuerySingle;
	client.his_SingleHistory = his_SingleHistory;
	client.single_SendFile = single_SendFile;
	client.single_SendHasRead = single_SendHasRead;
	client.single_SendPicture = single_SendPicture;
	client.single_SendText = single_SendText;
	client.sys_GroupCreateByMaster = sys_GroupCreateByMaster;
	client.sys_GroupDeleteByMaster = sys_GroupDeleteByMaster;
	client.sys_GroupExitByUser = sys_GroupExitByUser;
	client.sys_GroupJoinByUser = sys_GroupJoinByUser
};

/*************************************************************************服务端一一对应*/
const chatter_ChatterInfo = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const chatter_ResetUnreadMsg = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const fG_GetContacts = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const fG_GetFriends = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const fG_GetGroups = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const gM_Create = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const gM_Delete = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const gM_Exit = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const gM_GetGroups = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const gM_GroupInfo = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

/**
 * 群主-加人
 * @param {Object} groupInfo
 */
const gM_AddUsers = function(groupInfo) {
	console.log(`Info client.gM_AddUsers:${JSON.stringify(groupInfo)}`);
	STORE.dispatch(TYPES.IMCHAT_ACTION_MEMBERUPDATE, groupInfo);
};

/**
 * 群主-减人
 * @param {Object} groupInfo
 */
const gM_RemoveUsers = function(groupInfo) {
	console.log(`Info client.gM_RemoveUsers:${JSON.stringify(groupInfo)}`);
	STORE.dispatch(TYPES.IMCHAT_ACTION_MEMBERUPDATE, groupInfo);
};

const group_SendHasRead = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const group_SendNotice = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

/**
 * 发送-文件消息
 * 群聊
 * @param {Object} msg
 */
const group_SendFile = function(msg) {
	console.log(`Info client.group_SendFile:${JSON.stringify(msg)}`);
	STORE.dispatch(TYPES.IMCHAT_ACTION_GROUPRECEIVEMESSAGE, msg);
};

/**
 * 发送-图片消息
 * 群聊
 * @param {Object} msg
 */
const group_SendPicture = function(msg) {
	console.log(`Info client.group_SendPicture:${JSON.stringify(msg)}`);
	STORE.dispatch(TYPES.IMCHAT_ACTION_GROUPRECEIVEMESSAGE, msg);
};

/**
 * 发送-文本/表情消息
 * 群聊
 * @param {Object} msg
 */
const group_SendText = function(msg) {
	console.log(`Info client.group_SendText:${JSON.stringify(msg)}`);
	STORE.dispatch(TYPES.IMCHAT_ACTION_GROUPRECEIVEMESSAGE, msg);
};

const his_GroupHistory = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const his_QueryGroup = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const his_QuerySingle = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const his_SingleHistory = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const single_SendHasRead = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

/**
 * 发送-文件消息
 * 单聊
 * @param {Object} msg
 */
const single_SendFile = function(msg) {
	console.log(`Info client.single_SendFile:${JSON.stringify(msg)}`);
	STORE.dispatch(TYPES.IMCHAT_ACTION_RECEIVEMESSAGE, msg);
};

/**
 * 发送-图片消息
 * 单聊
 * @param {Object} msg
 */
const single_SendPicture = function(msg) {
	console.log(`Info client.single_SendPicture:${JSON.stringify(msg)}`);
	STORE.dispatch(TYPES.IMCHAT_ACTION_RECEIVEMESSAGE, msg);
};

/**
 * 发送-文本/表情消息
 * 单聊
 * @param {Object} msg
 */
const single_SendText = function(msg) {
	console.log(`Info client.single_SendText:${JSON.stringify(msg)}`);
	STORE.dispatch(TYPES.IMCHAT_ACTION_RECEIVEMESSAGE, msg);
};

/**
 * 停止客户端连接
 */
const stopClient = function() {
	hub.stop();
};

const sys_GroupCreateByMaster = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const sys_GroupDeleteByMaster = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const sys_GroupExitByUser = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};

const sys_GroupJoinByUser = function() {

	console.log(`Info client.XXXX: ${ 1001 }`);

};
/*************************************************************************服务端一一对应*/

/**
 * 初始化-客户端api(供服务端调用)
 */
export default init_client