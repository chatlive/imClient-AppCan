/**
 * 输入工具条高度
 */
let inputBarHeight = '3rem'

/**
 * 会话列表
 * 状态
 */
let sessions = []

/**
 * 当前会话
 * 状态
 */
let currentSession = {
	/**
	 * 会话编号
	 */
	sessionId: '',
	/**
	 * 会话类型
	 */
	sessionType: '',
	/**
	 * 聊天编号
	 */
	chatId: '',
	/**
	 * 聊天名称
	 */
	chatName: '',
	/**
	 * 聊天头像
	 */
	chatImg: '',
}

/**
 * 会话类型
 * 状态* 
 */
let sessionType = {
	/**
	 * 单聊
	 */
	single: 1,
	/**
	 * 群聊
	 */
	group: 2
}

/**
 * 消息类型
 * 状态* 
 */
let msgType = {
	/**
	 * 文本
	 */
	TEXT: 1,
	/**
	 * 表情
	 */
	EXPRESSION: 2,
	/**
	 * 图片
	 */
	IMG: 3,
	/**
	 * 文件
	 */
	FILE: 4,
	/**
	 * 语音
	 */
	VOICE: 5,
	/**
	 * 视频
	 */
	VIDEO: 6,
	/**
	 * 位置
	 */
	LBS: 7
}

/**
 * 群组-职位-类型
 */
let groupPosition = {
	/**
	 * 群主
	 */
	founder: 1,
	/**
	 * 管理员
	 */
	manager: 2,
	/**
	 * 组员
	 */
	memeber: 3
}

/**
 * 过滤出只包含这个key的会话
 * 状态
 */
let sessionFilterKey = '';

/**
 * 好友
 * 状态
 */
let friends = [];

/**
 * 群组
 * 状态
 */
let groups = [];

const state = {
	inputBarHeight,
	sessions,
	currentSession,
	sessionType,
	msgType,
	groupPosition,
	sessionFilterKey,
	friends,
	groups,
};

export default state