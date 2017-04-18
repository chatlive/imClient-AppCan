/**
 * 设置输入工具条高度
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_SETINPUTBARHEIGHT = 'IMCHAT_MUTATION_SETINPUTBARHEIGHT'

/**
 * Single-发送消息
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_SENDMESSAGE = 'IMCHAT_MUTATION_SENDMESSAGE'

/**
 * Single-发送消息-回执
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_SENDMESSAGE_CB = 'IMCHAT_MUTATION_SENDMESSAGE_CB'

/**
 * Single-接收消息
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_RECEIVEMESSAGE = 'IMCHAT_MUTATION_RECEIVEMESSAGE'

/**
 * Group-发送消息
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_GROUPSENDMESSAGE = 'IMCHAT_MUTATION_GROUPSENDMESSAGE'

/**
 * Group-发送消息-回执
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_GROUPSENDMESSAGE_CB = 'IMCHAT_MUTATION_GROUPSENDMESSAGE_CB'

/**
 * Group-接收消息
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_GROUPRECEIVEMESSAGE = 'IMCHAT_MUTATION_GROUPRECEIVEMESSAGE'

/**
 * 设置群组信息
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_SETGROUPINFO = 'IMCHAT_MUTATION_SETGROUPINFO'

/**
 * 设置好友列表
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_SETFRIENDS = 'IMCHAT_MUTATION_SETFRIENDS'

/**
 * 设置群组列表
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_SETGROUPS = 'IMCHAT_MUTATION_SETGROUPS'

/**
 * 获取-群聊记录（分页）
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_HIS_GROUPHISTORY = 'IMCHAT_MUTATION_HIS_GROUPHISTORY'

/**
 * 获取-单聊记录（分页）
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_HIS_SINGLEHISTORY = 'IMCHAT_MUTATION_HIS_SINGLEHISTORY'

/**
 * 群组成员-变更
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_MEMBERUPDATE = 'IMCHAT_MUTATION_MEMBERUPDATE'

/**
 * 群组成员-添加
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_MEMBERADD = 'IMCHAT_MUTATION_MEMBERADD'

/**
 * 群组成员-添加-回执
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_MEMBERADD_CB = 'IMCHAT_MUTATION_MEMBERADD_CB'

/**
 * 群组成员-删除
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_MEMBERREMOVE = 'IMCHAT_MUTATION_MEMBERREMOVE'

/**
 * 群组成员-删除-回执
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_MEMBERREMOVE_CB = 'IMCHAT_MUTATION_MEMBERREMOVE_CB'

/**
 * 设置会话列表
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_SETSESSIONS = 'IMCHAT_MUTATION_SETSESSIONS'

/**
 * 设置当前会话
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_SETCURRENTSESSION = 'IMCHAT_MUTATION_SETCURRENTSESSION'

/**
 * 清空当前会话
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_CLEARCURRENTSESSION = 'IMCHAT_MUTATION_CLEARCURRENTSESSION'

/**
 * Single-发送消息
 * 异步分发
 * 事件类型
 */
const IMCHAT_ACTION_SENDMESSAGE = 'IMCHAT_ACTION_SENDMESSAGE'

/**
 * Single-接收消息
 * 异步分发
 * 事件类型
 */
const IMCHAT_ACTION_RECEIVEMESSAGE = 'IMCHAT_ACTION_RECEIVEMESSAGE'

/**
 * Group-发送消息
 * 异步分发
 * 事件类型
 */
const IMCHAT_ACTION_GROUPSENDMESSAGE = 'IMCHAT_ACTION_GROUPSENDMESSAGE'

/**
 * Group-接收消息
 * 异步分发
 * 事件类型
 */
const IMCHAT_ACTION_GROUPRECEIVEMESSAGE = 'IMCHAT_ACTION_GROUPRECEIVEMESSAGE'

/**
 * 群组成员-变更
 * 异步分发
 * 事件类型
 */
const IMCHAT_ACTION_MEMBERUPDATE = 'IMCHAT_ACTION_MEMBERUPDATE'

/**
 * 我创建的群组
 * 异步分发
 * 属性
 */
const IMCHAT_GET_ICREATED = 'IMCHAT_GET_ICREATED'
/**
 * 我加入的群组
 * 异步分发
 * 属性
 */
const IMCHAT_GET_IJOINED = 'IMCHAT_GET_IJOINED'

/**
 * 添加新会话
 * 同步执行
 * 事件类型
 */
const IMCHAT_MUTATION_ADDSESSION = 'IMCHAT_MUTATION_ADDSESSION'

const types = {
	IMCHAT_MUTATION_SETINPUTBARHEIGHT,
	IMCHAT_MUTATION_SENDMESSAGE,
	IMCHAT_MUTATION_SENDMESSAGE_CB,
	IMCHAT_MUTATION_RECEIVEMESSAGE,
	IMCHAT_MUTATION_GROUPSENDMESSAGE,
	IMCHAT_MUTATION_GROUPSENDMESSAGE_CB,
	IMCHAT_MUTATION_GROUPRECEIVEMESSAGE,
	IMCHAT_MUTATION_SETGROUPINFO,
	IMCHAT_MUTATION_SETFRIENDS,
	IMCHAT_MUTATION_SETGROUPS,
	IMCHAT_MUTATION_HIS_GROUPHISTORY,
	IMCHAT_MUTATION_HIS_SINGLEHISTORY,
	IMCHAT_MUTATION_MEMBERUPDATE,
	IMCHAT_MUTATION_MEMBERADD,
	IMCHAT_MUTATION_MEMBERADD_CB,
	IMCHAT_MUTATION_MEMBERREMOVE,
	IMCHAT_MUTATION_MEMBERREMOVE_CB,
	IMCHAT_MUTATION_SETSESSIONS,
	IMCHAT_MUTATION_SETCURRENTSESSION,
	IMCHAT_MUTATION_CLEARCURRENTSESSION,
	IMCHAT_ACTION_SENDMESSAGE,
	IMCHAT_ACTION_RECEIVEMESSAGE,
	IMCHAT_ACTION_GROUPSENDMESSAGE,
	IMCHAT_ACTION_GROUPRECEIVEMESSAGE,
	IMCHAT_ACTION_MEMBERUPDATE,
	IMCHAT_GET_ICREATED,
	IMCHAT_GET_IJOINED,
	IMCHAT_MUTATION_ADDSESSION,
};

export default types