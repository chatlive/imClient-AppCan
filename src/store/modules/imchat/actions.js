import TYPES from './types'

/**
 * Single-发送消息
 * 异步分发
 */
const imchat_action_sendmessage = ({
	commit
}, content) => {
	commit(TYPES.IMCHAT_MUTATION_SENDMESSAGE, content);
}

/**
 * Single-接收消息
 * 异步分发
 */
const imchat_action_receivemessage = ({
	commit
}, msg) => {
	commit(TYPES.IMCHAT_MUTATION_RECEIVEMESSAGE, msg);
}

/**
 * Group-发送消息
 * 异步分发
 */
const imchat_action_GroupSendmessage = ({
	commit
}, content) => {
	commit(TYPES.IMCHAT_MUTATION_GROUPSENDMESSAGE, content);
}

/**
 * Group-接收消息
 * 异步分发
 */
const imchat_action_GroupReceivemessage = ({
	commit
}, msg) => {
	commit(TYPES.IMCHAT_MUTATION_GROUPRECEIVEMESSAGE, msg);
}

/**
 * 群组成员-变更
 * 异步分发
 */
const imchat_action_memberUpdate = ({
	commit,
	rootState
}, groupInfo) => {
	let model = {
		groupInfo: groupInfo,
		account: rootState.system.user.account,
	};
	commit(TYPES.IMCHAT_MUTATION_MEMBERUPDATE, model);
}

const actions = {
	[TYPES.IMCHAT_ACTION_SENDMESSAGE]: imchat_action_sendmessage,
	[TYPES.IMCHAT_ACTION_RECEIVEMESSAGE]: imchat_action_receivemessage,
	[TYPES.IMCHAT_ACTION_GROUPSENDMESSAGE]: imchat_action_GroupSendmessage,
	[TYPES.IMCHAT_ACTION_GROUPRECEIVEMESSAGE]: imchat_action_GroupReceivemessage,
	[TYPES.IMCHAT_ACTION_MEMBERUPDATE]: imchat_action_memberUpdate,
};

export default actions