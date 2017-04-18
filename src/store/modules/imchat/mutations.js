import TYPES from './types'
import CHAT from 'api/imService'
import _ from 'lodash'
import clone from 'clone'

/**
 * 设置输入工具条高度
 * 同步执行
 */
const imchat_mutation_setInputBarHeight = (state, height, rootState) => {
	state.inputBarHeight = height;
}

/**
 * Single-发送消息
 * 同步执行
 */
const imchat_mutation_sendmessage = (state, msg) => {
	let session = state.sessions.find(item =>
		item.sessionType === state.currentSession.sessionType &&
		item.chatId === state.currentSession.chatId);

	session.messages.push(msg);
}

/**
 * Single-发送消息-回执
 * 同步执行
 */
const imchat_mutation_sendmessage_cb = (state, msg) => {
	let session = state.sessions.find(item =>
		item.sessionType === state.currentSession.sessionType &&
		item.chatId === state.currentSession.chatId);

	let message = session.messages.find(m => m.msgClientId == msg.msgClientId);

	message.success = msg.success;
	if(msg.success) {
		message.id = msg.id;
		message.msgTime = msg.msgTime;
		message.isRead = msg.isRead;
	}
}

/**
 * Single-接收消息
 * 同步执行
 */
const imchat_mutation_receivemessage = (state, msg, rootState) => {
	let oldSession = state.sessions.find(item =>
		item.sessionType == state.sessionType.single &&
		item.chatId == msg.from_UserId);

	if(oldSession === undefined) {
		//添加新会话
		imchat_mutation_addSession(state, {
			sessionType: state.sessionType.single,
			chatId: msg.from_UserId,
		}, rootState);
		//添加新消息
		let newSession = state.sessions.find(item =>
			item.sessionType == state.sessionType.single &&
			item.chatId == msg.from_UserId);
		newSession.unreadMsgCount = 1;
		newSession.messages.push(msg);
	} else {
		//添加新消息
		if(!isCurrentSession(oldSession, state.currentSession)) {
			//非当前会话
			oldSession.unreadMsgCount += 1;

		} else {
			//当前会话（ 通知后台已读消息）		

			//发送消息已读回执给后台
			CHAT.Chatter.chatter_ResetUnreadMsg_CurrentSession({
				chatId: oldSession.chatId,
				sessionType: oldSession.sessionType
			});
		}
		oldSession.messages.push(msg);
	}
}

/**
 * Group-发送消息
 * 同步执行
 */
const imchat_mutation_GroupSendmessage = (state, msg) => {
	let session = state.sessions.find(item =>
		item.sessionType === state.currentSession.sessionType &&
		item.chatId === state.currentSession.chatId);

	session.messages.push(msg);
}

/**
 * Group-发送消息-回执
 * 同步执行
 */
const imchat_mutation_GroupSendmessage_cb = (state, msg) => {
	let session = state.sessions.find(item =>
		item.sessionType === state.currentSession.sessionType &&
		item.chatId === state.currentSession.chatId);

	let message = session.messages.find(m => m.msgClientId == msg.msgClientId);

	message.success = msg.success;
	if(msg.success) {
		message.id = msg.id;
		message.msgTime = msg.msgTime;
		message.IsFullRead = msg.IsFullRead;
	}
}

/**
 * Group-接收消息
 * 同步执行
 */
const imchat_mutation_GroupReceivemessage = (state, msg, rootState) => {

	let oldSession = state.sessions.find(item =>
		item.sessionType == state.sessionType.group &&
		item.chatId == msg.to_GroupId);

	if(oldSession === undefined) {
		//添加新会话
		imchat_mutation_addSession(state, {
			sessionType: state.sessionType.group,
			chatId: msg.to_GroupId,
		}, rootState);
		//添加新消息
		let newSession = state.sessions.find(item =>
			item.sessionType == state.sessionType.group &&
			item.chatId == msg.to_GroupId);
		newSession.unreadMsgCount = 1;
		newSession.messages.push(msg);
	} else {
		//添加新消息
		if(!isCurrentSession(oldSession, state.currentSession)) {
			//非当前会话
			oldSession.unreadMsgCount += 1;

		} else {
			//当前会话（ 通知后台已读消息）		

			//发送消息已读回执给后台
			CHAT.Chatter.chatter_ResetUnreadMsg_CurrentSession({
				chatId: oldSession.chatId,
				sessionType: oldSession.sessionType
			});
		}
		oldSession.messages.push(msg);

		//		//当使用非变异方法时，可以用新数组替换旧数组
		//		let newMessages = clone(oldSession.messages);
		//		oldSession.messages = [];
		//		for(let message of newMessages) {
		//			oldSession.messages.push(message);
		//		}

	}
}

/**
 * 获取-群聊记录（分页）
 * 同步执行
 */
const imchat_mutation_his_grouphistory = (state, msgs, rootState) => {
	let oldSession = state.sessions.find(item =>
		item.sessionType == state.sessionType.group &&
		item.chatId == state.currentSession.chatId);

	if(oldSession) {
		for(let msg of msgs) {
			oldSession.messages.unshift(msg);
		}
	}
}

/**
 * 获取-单聊记录（分页）
 * 同步执行
 */
const imchat_mutation_his_singlehistory = (state, msgs, rootState) => {
	let oldSession = state.sessions.find(item =>
		item.sessionType == state.sessionType.single &&
		item.chatId == state.currentSession.chatId);

	if(oldSession) {
		for(let msg of msgs) {
			oldSession.messages.unshift(msg);
		}
	}
}

/**
 * 群组成员-变更
 * 同步执行
 */
const imchat_mutation_memberUpdate = (state, model, rootState) => {
	let groupInfo = model.groupInfo;
	let userAccount = model.account;

	let group = state.groups.find(item => item.groupId === groupInfo.groupId);
	if(group === undefined) { //群主-加人
		state.groups.push(groupInfo);
	} else {
		let own = groupInfo.members.find(item => item.account === userAccount);
		if(own === undefined) { //群组-删人
			_.remove(state.groups, function(n) {
				return n.groupId === groupInfo.groupId
			});

			//当使用非变异方法时，可以用新数组替换旧数组
			let newGroups = clone(state.groups);
			state.groups = [];
			for(let group of newGroups) {
				state.groups.push(group);
			}

		} else { //群成员列表更新（群组已有人员）
			group.members = [];
			for(let member of groupInfo.members) {
				group.members.push(member);
			}
		}
	}
}

/**
 * 群组成员-添加
 * 同步执行
 */
const imchat_mutation_memberAdd = (state, groupInfo) => {
	let group = state.groups.find(item => item.groupId === groupInfo.groupId);
	if(group === undefined) {} else {
		for(let member of groupInfo.members) {
			group.members.push(member);
		}
	}
}

/**
 * 群组成员-添加-回执
 * 同步执行
 */
const imchat_mutation_memberAdd_cb = (state, groupInfo) => {
	//	let group = state.groups.find(item => item.groupId === groupInfo.groupId);
	//	if(group === undefined) {
	//
	//	} else {
	//		for(let member of groupInfo.members) {
	//			group.members.push(member);
	//		}
	//	}
}

/**
 * 群组成员-删除
 * 同步执行
 */
const imchat_mutation_memberRemove = (state, groupInfo) => {
	let group = state.groups.find(item => item.groupId === groupInfo.groupId);

	if(group === undefined) {

	} else {
		for(let member of groupInfo.members) {
			_.remove(group.members, function(n) {
				return n === member
			});
		}
	}
}

/**
 * 群组成员-删除-回执
 * 同步执行
 */
const imchat_mutation_memberRemove_cb = (state, groupInfo) => {
	//	let group = state.groups.find(item => item.groupId === groupInfo.groupId);
	//
	//	if(group === undefined) {
	//
	//	} else {
	//		for(let member of groupInfo.members) {
	//			_.remove(group.members, function(n) { return n === member });
	//		}
	//	}
}

/**
 * 设置群组信息
 * 同步执行
 */
const imchat_mutation_setGroupInfo = (state, groupInfo) => {
	let group = state.groups.find(item => item.groupId === groupInfo.groupId);

	group.members = [];
	for(let member of groupInfo.members) {
		group.members.push(member);
	}
}

/**
 * 设置好友列表
 * 同步执行
 */
const imchat_mutation_setfriends = (state, newFreinds) => {
	state.friends = [];
	for(let friend of newFreinds) {
		state.friends.push(friend);
	}
}

/**
 * 设置群组列表
 * 同步执行
 */
const imchat_mutation_setgroups = (state, newGroups) => {
	state.groups = [];
	for(let group of newGroups) {
		state.groups.push(group);
	}
}

/**
 * 设置会话列表
 * 同步执行
 */
const imchat_mutation_setSessions = (state, newSessions) => {
	state.sessions = [];
	for(let session of newSessions) {
		state.sessions.push(session);
	}
}

/**
 * 设置当前会话
 * 同步执行
 */
const imchat_mutation_setCurrentSession = (state, newSession, rootState) => {
	//官方没有说明对象结构模式应用在module
	//设置当前会话
	state.currentSession.chatId = newSession.chatId;
	state.currentSession.chatName = newSession.chatName;
	state.currentSession.chatImg = newSession.chatImg;
	state.currentSession.sessionId = newSession.sessionId;
	state.currentSession.sessionType = newSession.sessionType;

	let oldSession = state.sessions.find(item =>
		item.sessionType === newSession.sessionType &&
		item.chatId === newSession.chatId
	);
	if(oldSession === undefined) {
		//添加新会话
		imchat_mutation_addSession(state, {
			sessionType: newSession.sessionType,
			chatId: newSession.chatId,
		}, rootState);
	}
}

/**
 * 清空当前会话
 * 同步执行
 */
const imchat_mutation_clearCurrentSession = (state) => {
	//清空当前会话
	state.currentSession.chatId = '';
	state.currentSession.chatName = '';
	state.currentSession.chatImg = '';
	state.currentSession.sessionId = '';
	state.currentSession.sessionType = '';
}

/**
 * 是否当前会话
 * 同步执行
 * @param {Object} compareSession - 待比较会话.
 * @param {Object} currentSession - 当前会话.
 */
function isCurrentSession(compareSession, currentSession) {

	//	return compareSession.sessionType != currentSession.sessionType ||
	//		compareSession.chatId != currentSession.chatId;

	let isCurrent = compareSession.sessionType === currentSession.sessionType &&
		compareSession.chatId === currentSession.chatId;
	return isCurrent;

};

/**
 * 添加新会话
 * 同步执行
 */
const imchat_mutation_addSession = (state, addSession, rootState) => {
	var sessionType = addSession.sessionType;
	var chatId = addSession.chatId;
	if(sessionType === state.sessionType.single) {
		let friend = state.friends.find(f => f.account == chatId);

		console.log(`会话数组添加single会话:${JSON.stringify(friend)}`);
		let addSession = {
			chatId: friend.account,
			chatName: friend.name,
			chatImg: friend.img,
			sessionId: '',
			sessionType: state.sessionType.single,
			unreadMsgCount: 0,
			chatterTime: new Date(),
			messages: []
		};

		state.sessions.push(addSession);

	} else if(sessionType === state.sessionType.group) {
		let group = state.groups.find(f => f.groupId == chatId);

		console.log(`会话数组添加group会话:${JSON.stringify(group)}`);
		let addSession = {
			chatId: group.groupId,
			chatName: group.groupName,
			chatImg: '',
			sessionId: '',
			sessionType: state.sessionType.group,
			unreadMsgCount: 0,
			chatterTime: new Date(),
			messages: []
		};

		state.sessions.push(addSession);

	} else {}
}

const mutations = {
	[TYPES.IMCHAT_MUTATION_SETINPUTBARHEIGHT]: imchat_mutation_setInputBarHeight,
	[TYPES.IMCHAT_MUTATION_SENDMESSAGE]: imchat_mutation_sendmessage,
	[TYPES.IMCHAT_MUTATION_SENDMESSAGE_CB]: imchat_mutation_sendmessage_cb,
	[TYPES.IMCHAT_MUTATION_RECEIVEMESSAGE]: imchat_mutation_receivemessage,
	[TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE]: imchat_mutation_GroupSendmessage,
	[TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE_CB]: imchat_mutation_GroupSendmessage_cb,
	[TYPES.IMCHAT_MUTATION_GROUPRECEIVEMESSAGE]: imchat_mutation_GroupReceivemessage,
	[TYPES.IMCHAT_MUTATION_HIS_GROUPHISTORY]: imchat_mutation_his_grouphistory,
	[TYPES.IMCHAT_MUTATION_HIS_SINGLEHISTORY]: imchat_mutation_his_singlehistory,
	[TYPES.IMCHAT_MUTATION_MEMBERUPDATE]: imchat_mutation_memberUpdate,
	[TYPES.IMCHAT_MUTATION_MEMBERADD]: imchat_mutation_memberAdd,
	[TYPES.IMCHAT_MUTATION_MEMBERADD_CB]: imchat_mutation_memberAdd_cb,
	[TYPES.IMCHAT_MUTATION_MEMBERREMOVE]: imchat_mutation_memberRemove,
	[TYPES.IMCHAT_MUTATION_MEMBERREMOVE_CB]: imchat_mutation_memberRemove_cb,
	[TYPES.IMCHAT_MUTATION_SETGROUPINFO]: imchat_mutation_setGroupInfo,
	[TYPES.IMCHAT_MUTATION_SETFRIENDS]: imchat_mutation_setfriends,
	[TYPES.IMCHAT_MUTATION_SETGROUPS]: imchat_mutation_setgroups,
	[TYPES.IMCHAT_MUTATION_SETSESSIONS]: imchat_mutation_setSessions,
	[TYPES.IMCHAT_MUTATION_SETCURRENTSESSION]: imchat_mutation_setCurrentSession,
	[TYPES.IMCHAT_MUTATION_CLEARCURRENTSESSION]: imchat_mutation_clearCurrentSession,
	[TYPES.IMCHAT_MUTATION_ADDSESSION]: null,
};

export default mutations