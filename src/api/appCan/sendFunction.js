import generator from 'node-uuid-generator'
import STORE from 'store/index'
import CHAT from 'api/imService'
import TYPES from 'store/modules/imchat/types'
import upload from 'api/appCan/upload'

/**
 * 单聊
 */
let SINGLE = STORE.state.imchat.sessionType.single;
/**
 * 群聊
 */
let GROUP = STORE.state.imchat.sessionType.group;
/**
 * 获取当前会话类型
 */
const getSessionType = function() {
	let sessionType = STORE.state.imchat.currentSession.sessionType
	return sessionType;
};

/**
 * 生成消息对象(文本)
 * @param {String} msgText - 消息文本.
 */
const genMsgText = function(msgText) {
	let uuid = generator.generate();
	let msg = {
		id: '',
		msgClientId: uuid,
		from_UserId: STORE.state.system.user.account,
		to_UserId: STORE.state.imchat.currentSession.chatId,
		msgTime: new Date(),
		isRead: false,
		msgType: STORE.state.imchat.msgType.TEXT,
		msgBody: msgText,
		success: true,
	};
	return msg;
};

/**
 * 生成消息对象(图片)
 * @param {String} msgText - 图片路径.
 */
const genMsgPic = function(msgText) {
	let uuid = generator.generate();
	let msg = {
		id: '',
		msgClientId: uuid,
		from_UserId: STORE.state.system.user.account,
		to_UserId: STORE.state.imchat.currentSession.chatId,
		msgTime: new Date(),
		isRead: false,
		msgType: STORE.state.imchat.msgType.IMG,
		msgBody: msgText,
		success: true,
	};
	return msg;
};

/**
 * 生成消息对象(文件)
 * @param {String} msgText - 文件路径.
 */
const genMsgFile = function(msgText) {
	let uuid = generator.generate();
	let msg = {
		id: '',
		msgClientId: uuid,
		from_UserId: STORE.state.system.user.account,
		to_UserId: STORE.state.imchat.currentSession.chatId,
		msgTime: new Date(),
		isRead: false,
		msgType: STORE.state.imchat.msgType.FILE,
		msgBody: msgText,
		success: true,
	};
	return msg;
};

/**
 * 生成消息对象(文本)
 * @param {String} msgText - 消息文本.
 */
const genMsgText_Group = function(msgText) {
	let uuid = generator.generate();
	let msg = {
		id: '',
		msgClientId: uuid,
		from_UserId: STORE.state.system.user.account,
		to_GroupId: STORE.state.imchat.currentSession.chatId,
		msgTime: new Date(),
		isRead: false,
		msgType: STORE.state.imchat.msgType.TEXT,
		msgBody: msgText,
		success: true,
	};
	return msg;
};

/**
 * 生成消息对象(图片)
 * @param {String} msgText - 图片路径.
 */
const genMsgPic_Group = function(msgText) {
	let uuid = generator.generate();
	let msg = {
		id: '',
		msgClientId: uuid,
		from_UserId: STORE.state.system.user.account,
		to_GroupId: STORE.state.imchat.currentSession.chatId,
		msgTime: new Date(),
		isRead: false,
		msgType: STORE.state.imchat.msgType.IMG,
		msgBody: msgText,
		success: true,
	};
	return msg;
};

/**
 * 生成消息对象(文件)
 * @param {String} msgText - 文件路径.
 */
const genMsgFile_Group = function(msgText) {
	let uuid = generator.generate();
	let msg = {
		id: '',
		msgClientId: uuid,
		from_UserId: STORE.state.system.user.account,
		to_GroupId: STORE.state.imchat.currentSession.chatId,
		msgTime: new Date(),
		isRead: false,
		msgType: STORE.state.imchat.msgType.FILE,
		msgBody: msgText,
		success: true,
	};
	return msg;
};

/**
 * 发送消息(文本)
 * @param {Object} emojiconsText - 输入框里的内容.
 */
const sendMsg = function(emojiconsText) {
	if(emojiconsText.trim() === '') {
		return;
	} else {
		let sessionType = getSessionType();
		if(sessionType == SINGLE) {

			let msg = genMsgText(emojiconsText);
			CHAT.Single.single_SendText(msg);
			STORE.dispatch(TYPES.IMCHAT_ACTION_SENDMESSAGE, msg);
		} else if(sessionType == GROUP) {

			let msg = genMsgText_Group(emojiconsText);
			CHAT.Group.group_SendText(msg);
			STORE.dispatch(TYPES.IMCHAT_ACTION_GROUPSENDMESSAGE, msg);
		}
	}
};

/**
 * 发送消息(图像)
 * @param {String} localPath - 本地图像路径.
 */
const sendpic = function(localPath) {
	if(localPath.trim() === '') {
		return;
	} else {
		upload.upload_Img(localPath,
			function(serverPath) {
				if(serverPath != null) {

					let sessionType = getSessionType();
					if(sessionType == SINGLE) {
						let msg = genMsgPic(serverPath);
						CHAT.Single.single_SendPicture(msg);
						STORE.dispatch(TYPES.IMCHAT_ACTION_SENDMESSAGE, msg);
					} else if(sessionType == GROUP) {

						let msg = genMsgPic_Group(serverPath);
						CHAT.Group.group_SendPicture(msg);
						STORE.dispatch(TYPES.IMCHAT_ACTION_GROUPSENDMESSAGE, msg);
					}
				}
			}
		);
	}
}

/**
 * 发送消息-测试
 * @param {String} content - 测试内容.
 */
const sendTest = function(content) {
	let msg = genMsgText_Group(content);
	CHAT.Group.group_SendText(msg);
	STORE.dispatch(TYPES.IMCHAT_ACTION_GROUPSENDMESSAGE, msg);
}

/**
 * 发送消息(文件)
 * @param {String} localPath - 本地文件路径.
 */
const sendfile = function(localPath) {
	if(localPath.trim() === '') {
		return;
	} else {
		upload.upload_File(localPath,
			function(serverPath) {
				if(serverPath != null) {

					let sessionType = getSessionType();
					if(sessionType == SINGLE) {
						let msg = genMsgFile(serverPath);
						CHAT.Single.single_SendFile(msg);
						STORE.dispatch(TYPES.IMCHAT_ACTION_SENDMESSAGE, msg);
					} else if(sessionType == GROUP) {

						let msg = genMsgFile_Group(serverPath);
						CHAT.Group.group_SendFile(msg);
						STORE.dispatch(TYPES.IMCHAT_ACTION_GROUPSENDMESSAGE, msg);
					}
				}
			}
		);
	}
}

const sendFunction = {
	sendMsg,
	sendpic,
	sendfile,
	sendTest,
};

export default sendFunction