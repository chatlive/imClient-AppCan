import STORE from 'store/index'
import IMCHAT_TYPES from 'store/modules/imchat/types'
import IMCOMMON from 'api/imCommon'
import TYPES from 'store/modules/imchat/types'

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

/*************************************************************************服务端一一对应*/
/**
 * 获取-会话信息
 */
const chatter_ChatterInfo = function() {
	server.chatter_ChatterInfo()
		.done(function(data) { //服务器端有返回值，无返回值
			let sessions = data;
			STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SETSESSIONS, sessions);
		})
		.fail(function(error) {
			console.log(`Error server.chatter_ChatterInfo:${JSON.stringify(error)}`);
		});
};

/**
 * 会话-重置未读消息数
 * @param {Object} model 输入
 */
const chatter_ResetUnreadMsg = function({
	chatId,
	sessionType
}) {
	let oldSession = STORE.state.imchat.sessions.find(s => s.sessionType == sessionType && s.chatId == chatId);

	if(oldSession && oldSession.unreadMsgCount > 0) {

		let model = {
			chatId: chatId,
			sessionType: sessionType
		};

		server.chatter_ResetUnreadMsg(model)
			.done(function(data) { //服务器端有返回值，无返回值
				oldSession.unreadMsgCount = data.unreadMsgCount;
			})
			.fail(function(error) {
				console.log(`Error server.chatter_ResetUnreadMsg:${JSON.stringify(error)}`);
			});
	}

};

/**
 * 会话-重置未读消息数(当前会话)
 * New消息已读回执
 * @param {Object} model 输入
 */
const chatter_ResetUnreadMsg_CurrentSession = function({
	chatId,
	sessionType
}) {

	let model = {
		chatId: chatId,
		sessionType: sessionType
	};

	server.chatter_ResetUnreadMsg(model)
		.done(function(data) { //服务器端有返回值，无返回值				
		})
		.fail(function(error) {
			console.log(`Error server.chatter_ResetUnreadMsg_CurrentSession:${JSON.stringify(error)}`);
		});

};

const fG_GetContacts = function() {
	server.fG_GetContacts()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.fG_GetContacts:${JSON.stringify(error)}`);
		});
};

/**
 * 获取-好友
 */
const fG_GetFriends = function() {
	server.fG_GetFriends()
		.done(function(data) { //服务器端有返回值，无返回值
			let friends = data;
			STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SETFRIENDS, friends);
		})
		.fail(function(error) {
			console.log(`Error server.fG_GetFriends:${JSON.stringify(error)}`);
		});
};

/**
 * 获取-群组
 */
const fG_GetGroups = function() {
	server.fG_GetGroups()
		.done(function(data) { //服务器端有返回值，无返回值
			let groups = data;
			STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SETGROUPS, groups);
		})
		.fail(function(error) {
			console.log(`Error server.fG_GetGroups:${JSON.stringify(error)}`);
		});
};

/**
 * 群主-加人
 * @param {Object} model
 * @param {String} model.groupId - 群聊编号.
 * @param {Array[String]} model.accounts - 待添加-账户名集合.
 */
const gM_AddUsers = function(model) {
	server.gM_AddUsers(model)
		.done(function(data) { //服务器端有返回值，无返回值
			console.log(`server.gM_AddUsers:${JSON.stringify(data)}`);
		})
		.fail(function(error) {
			console.log(`Error server.gM_AddUsers:${JSON.stringify(error)}`);
		});
};

/**
 * 群主-减人
 * @param {Object} model
 * @param {String} model.groupId - 群聊编号.
 * @param {Array[String]} model.accounts - 待移除-账户名集合.
 */
const gM_RemoveUsers = function(model) {
	server.gM_RemoveUsers(model)
		.done(function(data) { //服务器端有返回值，无返回值

			console.log(`server.gM_RemoveUsers:${JSON.stringify(data)}`);
		})
		.fail(function(error) {
			console.log(`Error server.gM_RemoveUsers:${JSON.stringify(error)}`);
		});
};

/**
 * 群主-创建群
 * @param {Object} model
 * @param {String} model.groupId - 群聊编号.
 * @param {String} model.groupName - 群聊名称.
 * @param {Function} callback - 创建成败回调函数.
 */
const gM_Create = function(model, callback) {
	server.gM_Create(model)
		.done(function(data) { //服务器端有返回值，无返回值
			callback(data);
			//			if(data.success) {
			//				console.log(`server.gM_Create:${JSON.stringify(data)}`);
			//			} else {
			//				console.log(`server.gM_Create:${JSON.stringify(data)}`);
			//			}
		})
		.fail(function(error) {
			console.log(`Error server.gM_Create:${JSON.stringify(error)}`);
		});
};

const gM_Delete = function() {
	server.gM_Delete()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.gM_Delete:${JSON.stringify(error)}`);
		});
};

const gM_Exit = function() {
	server.gM_Exit()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.gM_Exit:${JSON.stringify(error)}`);
		});
};

const gM_GetGroups = function() {
	server.gM_GetGroups()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.gM_GetGroups:${JSON.stringify(error)}`);
		});
};

/**
 * 获取群组详情
 * @param {Object} model
 * @param {String} model.groupId - 群聊编号.
 */
const gM_GroupInfo = function(model) {
	server.gM_GroupInfo(model)
		.done(function(data) { //服务器端有返回值，无返回值
			let groupInfo = {
				groupId: model.groupId,
				members: data
			};
			STORE.commit(TYPES.IMCHAT_MUTATION_SETGROUPINFO, groupInfo);
		})
		.fail(function(error) {
			console.log(`Error server.gM_GroupInfo:${JSON.stringify(error)}`);
		});
};

const group_SendHasRead = function() {
	server.group_SendHasRead()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.group_SendHasRead:${JSON.stringify(error)}`);
		});
};

const group_SendNotice = function() {
	server.group_SendNotice()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.group_SendNotice:${JSON.stringify(error)}`);
		});
};

/**
 * 发送-文件消息
 * @param {Object} model
 */
const group_SendFile = function({
	id,
	msgClientId,
	from_UserId,
	to_GroupId,
	msgTime,
	isRead,
	msgType,
	msgBody,
	success
}) {
	let model = {
		msgClientId: msgClientId,
		from_UserId: from_UserId,
		to_GroupId: to_GroupId,
		msgType: msgType,
		msgBody: msgBody
	};
	server.group_SendFile(model)
		.done(function(data) { //服务器端有返回值，无返回值	
			if(data != null) {
				let msg = {
					success: true,
					...data
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE_CB, msg)
			} else {
				let msg = {
					success: false
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE_CB, msg)
			}
		})
		.fail(function(error) {
			let msg = {
				success: false
			};
			console.log(`Error server.group_SendFile:${JSON.stringify(msg)}`);
			STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE_CB, msg)
			console.log(`Error server.group_SendFile:${JSON.stringify(error)}`);
		});
};

/**
 * 发送-图片消息
 * @param {Object} model
 */
const group_SendPicture = function({
	id,
	msgClientId,
	from_UserId,
	to_GroupId,
	msgTime,
	isRead,
	msgType,
	msgBody,
	success
}) {
	let model = {
		msgClientId: msgClientId,
		from_UserId: from_UserId,
		to_GroupId: to_GroupId,
		msgType: msgType,
		msgBody: msgBody
	};
	server.group_SendPicture(model)
		.done(function(data) { //服务器端有返回值，无返回值	
			if(data != null) {
				let msg = {
					success: true,
					...data
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE_CB, msg)
			} else {
				let msg = {
					success: false
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE_CB, msg)
			}
		})
		.fail(function(error) {
			let msg = {
				success: false
			};
			console.log(`Error server.group_SendPicture:${JSON.stringify(msg)}`);
			STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE_CB, msg)
			console.log(`Error server.group_SendPicture:${JSON.stringify(error)}`);
		});
};

/**
 * 发送-文本/表情消息
 * @param {Object} model
 */
const group_SendText = function({
	id,
	msgClientId,
	from_UserId,
	to_GroupId,
	msgTime,
	isRead,
	msgType,
	msgBody,
	success
}) {
	let model = {
		msgClientId: msgClientId,
		from_UserId: from_UserId,
		to_GroupId: to_GroupId,
		msgType: msgType,
		msgBody: msgBody
	};
	//	console.log(`Info server.group_SendText:${JSON.stringify(model)}`);
	server.group_SendText(model)
		.done(function(data) { //服务器端有返回值，无返回值		
			if(data != null) {
				let msg = {
					success: true,
					...data
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE_CB, msg)
			} else {
				let msg = {
					success: false
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE_CB, msg)
			}
		})
		.fail(function(error) {
			let msg = {
				success: false
			};
			console.log(`Error server.group_SendText:${JSON.stringify(msg)}`);
			STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE_CB, msg)
			console.log(`Error server.group_SendText:${JSON.stringify(error)}`);
		});
};

/**
 * hello消息
 * @param {Object} message
 */
const hello = function(message) {
	let who = IMCOMMON.getApp__Account();

	server.hello(who, message)
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.hello:${JSON.stringify(error)}`);
		});
};

const his_QueryGroup = function() {
	server.his_QueryGroup()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.his_QueryGroup:${JSON.stringify(error)}`);
		});
};

const his_QuerySingle = function() {
	server.his_QuerySingle()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.his_QuerySingle:${JSON.stringify(error)}`);
		});
};

/**
 * 群聊-单聊记录（分页）
 */
const his_GroupHistory = function({
	chatId,
	msgId
}) {
	let model = {
		chatId: chatId,
		msgId: msgId
	};

	server.his_GroupHistory(model)
		.done(function(data) { //服务器端有返回值，无返回值
			STORE.commit(TYPES.IMCHAT_MUTATION_HIS_GROUPHISTORY, data);
		})
		.fail(function(error) {
			console.log(`Error server.his_GroupHistory:${JSON.stringify(error)}`);
		});
};

/**
 * 获取-单聊记录（分页）
 */
const his_SingleHistory = function({
	chatId,
	msgId
}) {
	let model = {
		chatId: chatId,
		msgId: msgId
	};

	server.his_SingleHistory(model)
		.done(function(data) { //服务器端有返回值，无返回值
			STORE.commit(TYPES.IMCHAT_MUTATION_HIS_SINGLEHISTORY, data);
		})
		.fail(function(error) {
			console.log(`Error server.his_SingleHistory:${JSON.stringify(error)}`);
		});
};

const single_SendHasRead = function() {
	server.single_SendHasRead()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.single_SendHasRead:${JSON.stringify(error)}`);
		});
};

/**
 * 发送-文件消息
 * @param {Object} model
 */
const single_SendFile = function({
	id,
	msgClientId,
	from_UserId,
	to_UserId,
	msgTime,
	isRead,
	msgType,
	msgBody,
	success
}) {
	let model = {
		msgClientId: msgClientId,
		from_UserId: from_UserId,
		to_UserId: to_UserId,
		msgType: msgType,
		msgBody: msgBody
	};
	server.single_SendFile(model)
		.done(function(data) { //服务器端有返回值，无返回值
			if(data != null) {
				let msg = {
					success: true,
					...data
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SENDMESSAGE_CB, msg)
			} else {
				let msg = {
					success: false
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SENDMESSAGE_CB, msg)
			}
		})
		.fail(function(error) {
			let msg = {
				success: false
			};
			console.log(`Error server.single_SendFile:${JSON.stringify(msg)}`);
			STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SENDMESSAGE_CB, msg)
			console.log(`Error server.single_SendFile:${JSON.stringify(error)}`);
		});
};

/**
 * 发送-图片消息
 * @param {Object} model
 */
const single_SendPicture = function({
	id,
	msgClientId,
	from_UserId,
	to_UserId,
	msgTime,
	isRead,
	msgType,
	msgBody,
	success
}) {
	let model = {
		msgClientId: msgClientId,
		from_UserId: from_UserId,
		to_UserId: to_UserId,
		msgType: msgType,
		msgBody: msgBody
	};
	server.single_SendPicture(model)
		.done(function(data) { //服务器端有返回值，无返回值
			if(data != null) {
				let msg = {
					success: true,
					...data
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SENDMESSAGE_CB, msg)
			} else {
				let msg = {
					success: false
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SENDMESSAGE_CB, msg)
			}
		})
		.fail(function(error) {
			let msg = {
				success: false
			};
			console.log(`Error server.single_SendPicture:${JSON.stringify(msg)}`);
			STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SENDMESSAGE_CB, msg)
			console.log(`Error server.single_SendPicture:${JSON.stringify(error)}`);
		});
};

/**
 * 发送-文本/表情消息
 * @param {Object} model
 */
const single_SendText = function({
	id,
	msgClientId,
	from_UserId,
	to_UserId,
	msgTime,
	isRead,
	msgType,
	msgBody,
	success
}) {
	let model = {
		msgClientId: msgClientId,
		from_UserId: from_UserId,
		to_UserId: to_UserId,
		msgType: msgType,
		msgBody: msgBody
	};
	server.single_SendText(model)
		.done(function(data) { //服务器端有返回值，无返回值			
			if(data != null) {
				let msg = {
					success: true,
					...data
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SENDMESSAGE_CB, msg)
			} else {
				let msg = {
					success: false
				};

				STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SENDMESSAGE_CB, msg)
			}
		})
		.fail(function(error) {
			let msg = {
				success: false
			};
			console.log(`Error server.single_SendText:${JSON.stringify(msg)}`);
			STORE.commit(IMCHAT_TYPES.IMCHAT_MUTATION_SENDMESSAGE_CB, msg)
			console.log(`Error server.single_SendText:${JSON.stringify(error)}`);
		});
};

/**
 * 停止客户端连接
 */
const stopClient = function() {

	hub.stop();
	//	server.stopClient()
	//		.done(function(data) { //服务器端有返回值，无返回值
	//
	//		})
	//		.fail(function(error) {
	//			console.log(`Error server.stopClient:${JSON.stringify(error)}`);
	//		});
};

const sys_GroupCreateByMaster = function() {
	server.sys_GroupCreateByMaster()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.sys_GroupCreateByMaster:${JSON.stringify(error)}`);
		});
};

const sys_GroupDeleteByMaster = function() {
	server.sys_GroupDeleteByMaster()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.sys_GroupDeleteByMaster:${JSON.stringify(error)}`);
		});
};

const sys_GroupExitByUser = function() {
	server.sys_GroupExitByUser()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.sys_GroupExitByUser:${JSON.stringify(error)}`);
		});
};

const sys_GroupJoinByUser = function() {
	server.sys_GroupJoinByUser()
		.done(function(data) { //服务器端有返回值，无返回值

		})
		.fail(function(error) {
			console.log(`Error server.sys_GroupJoinByUser:${JSON.stringify(error)}`);
		});
};
/*************************************************************************服务端一一对应*/

/**
 * 会话
 */
const Chatter = {
	chatter_ChatterInfo: chatter_ChatterInfo,
	chatter_ResetUnreadMsg: chatter_ResetUnreadMsg,
	chatter_ResetUnreadMsg_CurrentSession: chatter_ResetUnreadMsg_CurrentSession,
};
/**
 * 客户端管理
 */
const ClientManage = {
	hello: hello,
	stopClient: stopClient
};
/**
 * 好友/群组信息
 */
const FriendGroup = {
	fG_GetContacts: fG_GetContacts,
	fG_GetFriends: fG_GetFriends,
	fG_GetGroups: fG_GetGroups
};
const Group = {
	group_SendFile: group_SendFile,
	group_SendHasRead: group_SendHasRead,
	group_SendNotice: group_SendNotice,
	group_SendPicture: group_SendPicture,
	group_SendText: group_SendText
};
const GroupManage = {
	gM_AddUsers: gM_AddUsers,
	gM_Create: gM_Create,
	gM_Delete: gM_Delete,
	gM_Exit: gM_Exit,
	gM_GetGroups: gM_GetGroups,
	gM_GroupInfo: gM_GroupInfo,
	gM_RemoveUsers: gM_RemoveUsers
};
const History = {
	his_GroupHistory: his_GroupHistory,
	his_QueryGroup: his_QueryGroup,
	his_QuerySingle: his_QuerySingle,
	his_SingleHistory: his_SingleHistory
};
/**
 * 单聊
 */
const Single = {
	single_SendFile: single_SendFile,
	single_SendHasRead: single_SendHasRead,
	single_SendPicture: single_SendPicture,
	single_SendText: single_SendText
};
const System = {
	sys_GroupCreateByMaster: sys_GroupCreateByMaster,
	sys_GroupDeleteByMaster: sys_GroupDeleteByMaster,
	sys_GroupExitByUser: sys_GroupExitByUser,
	sys_GroupJoinByUser: sys_GroupJoinByUser
};

/**
 * 映射-Server Api(供客户端各个组件调用)
 * @param {Object} _hub ($.connection.hub 代理)
 * @param {Object} _server ($.connection.<imHub名称>.server 代理)
 * @param {Object} _service (供给各个组件调用的API集合对象)
 */
const map_service = function(_hub, _server, _service) {
	hub = _hub;
	server = _server;

	_service.Chatter = Chatter;
	/**
	 * 客户端管理
	 */
	_service.ClientManage = ClientManage;
	_service.FriendGroup = FriendGroup;
	_service.Group = Group;
	_service.GroupManage = GroupManage;
	_service.History = History;
	_service.Single = Single;
	_service.System = System;
};

/**
 * 映射-Server Api(供客户端各个组件调用)
 */
export default map_service