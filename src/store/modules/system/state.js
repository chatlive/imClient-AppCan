
/**
 * 应用程序Id
 * 状态
 */
let APPID = ''

/**
 * 全屏模式
 * 状态
 */
let fullScreen = true

/**
 * 欢迎辞
 * 状态
 */
let hello = `欢迎您!!!`

/**
 * 作者详情
 * 状态
 */
let author = {
	/**
	 * 姓名
	 */
	name: '梁智慧',
	/**
	 * 邮箱
	 */
	email: '214909012@qq.com',
}

/**
 * 当前用户
 * 状态
 */
let user = {
	/**
	 * 账户
	 */
	account: '',
	/**
	 * 名称
	 */
	name: '',
	/**
	 * 头像
	 */
	img: ''
}

/**
 * 当前顶级菜单
 * 状态
 */
let currentMenu = {
	/**
	 * 编号
	 */
	id: '',
	/**
	 * 名称
	 */
	name: '',
	/**
	 * 图标（目前采用semantic-ui图标）
	 */
	icon: ''
}

/**
 * 顶级菜单
 * 状态
 */
let menus = [{
		id: 'News',
		name: '消息',
		icon: 'talk'
	},
	//	{
	//		id: 'Ding',
	//		name: 'DING',
	//		icon: 'map pin'
	//	},
	//	{
	//		id: 'Work',
	//		name: '红圈营销',
	//		icon: 'block layout'
	//	},
	{
		id: 'Contacts',
		name: '联系人',
		icon: 'magnet'
	},
	{
		id: 'Mime',
		name: '我的',
		icon: 'user'
	},
]

/**
 * 展示加载框
 */
let showLoading = false

/**
 * 展示错误提示框
 */
let showDialog = false

/**
 * 错误代码
 */
let errorCode = ''

export default {
	APPID,
	fullScreen,
	hello,
	author,
	user,
	currentMenu,
	menus,
	showLoading,
	showDialog,
	errorCode,
}